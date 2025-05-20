<?php

namespace Database\Seeders;

use App\Models\Icon;
use App\Services\SvgSanitizerService;
use BladeUI\Icons\Exceptions\SvgNotFound;
use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Seeder;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\Console\Helper\ProgressBar;

use function storage_path;

/**
 * IconSeeder is responsible for seeding the database with icon sets.
 * It initializes necessary services like SVG sanitizer and filesystem,
 * processes icon sets, and handles inserting icons into the database in bulk.
 */
class IconSeeder extends Seeder
{
    public string $storagePath;

    private array $styleEnum = ['solid', 'regular', 'light', 'duotone', 'brands', 'outline', 'custom', 'thin', null];

    private Filesystem $filesystem;

    private SvgSanitizerService $svgSanitizer;

    private int $iconSetCount = 0;

    private ProgressBar $iconSetProgressBar;

    private ProgressBar $iconProgressBar;

    private int $iconCount = 0;

    private int $iconChunkSize = 25;

    private int $iconChunkCount = 0;

    private ProgressBar $iconChunkProgressBar;

    /**
     * IconSeeder constructor.
     */
    public function __construct()
    {
        // Initialize the SVG sanitizer service
        $this->svgSanitizer = new SvgSanitizerService;
        // Initialize the filesystem
        $this->filesystem = new Filesystem;
        // Initialize the storage path
        $this->storagePath = storage_path('app/public/build/assets/icons');
    }

    /**
     * Run the database seeds.
     *
     * @throws SvgNotFound|FileNotFoundException
     */
    public function run(): void
    {
        // Load the icon set configuration file from blade-icons
        $iconSets = config('blade-icons.sets');

        // Check if the icon sets are empty
        if (empty($iconSets)) {
            // Log an error if the icon sets are empty
            $this->command->error('No icon sets found in the configuration file.');
        }

        // Count the number of icon sets
        $this->iconSetCount = count($iconSets);

        // Initialize the icon set progress bar
        $this->iconSetProgressBar = $this->command->getOutput()->createProgressBar($this->iconSetCount);

        // Create Icons dynamically
        $this->createIcons($iconSets);
    }

    /**
     * Create Icons dynamically based on the provided icon sets.
     * This ensures that the initial icons are available in the database based on what BladeUI Icons provides.
     *
     * @throws SvgNotFound|FileNotFoundException
     */
    private function createIcons($iconSets): void
    {
        $iconsToCreate = []; // Initialize the icons to create array

        foreach (array_chunk($iconSets, 3, true) as $iconSetChunk) {
            // Loop through the icon sets
            foreach ($iconSetChunk as $iconSetName => $iconSet) {
                // Get the icon set class
                $iconSetClass = $iconSet['class'];

                // Get the icon set prefix
                $iconSetPrefix = $iconSet['prefix'];

                // Get the icon set path
                $iconSetPath = $iconSet['path'];

                // Get the icons from the set path
                $icons = $this->getIcons($iconSetPath);

                // Count the number of icons in the set
                $this->iconCount = count($icons);

                // Initialize the icon progress bar
                $this->iconProgressBar = $this->command->getOutput()->createProgressBar($this->iconCount);

                // Determine the number of chunks based on the number of icons
                $this->iconChunkCount = ceil($this->iconCount / $this->iconChunkSize);

                // Initialize the icon chunk progress bar
                $this->iconChunkProgressBar = $this->command->getOutput()->createProgressBar($this->iconChunkCount);

                // Get the icons in chunks to avoid memory overload/segfault
                foreach (array_chunk($icons, $this->iconChunkSize) as $iconChunk) {
                    // Advance the icon chunk progress bar
                    $this->iconChunkProgressBar->advance();

                    // For each icon in the set, create an icon in the database
                    foreach ($iconChunk as $icon) {
                        // Get the icon name
                        $iconName = $icon['name'];

                        // Get the icon path
                        $iconPath = $iconSetPath.'/'.$iconName.'.svg';

                        // Get the icon svg code
                        // $iconSvg = $icon['svg']; - removed for memory issues, also not technically needed anymore

                        // Get the icon type and style
                        $iconTypeAndStyle = $this->getIconTypeAndStyle($iconSetName);

                        // Get the icon type
                        $iconType = $iconTypeAndStyle['type'];

                        // Get the icon style
                        $iconStyle = $iconTypeAndStyle['style'];

                        // Create an icon Key based on the icon name, type, style and prefix
                        $iconKey = $iconName.'-'.$iconType.'-'.$iconStyle.'-'.$iconSetPrefix;

                        // Check if the icon already exists in the array
                        if (isset($iconsToCreate[$iconKey])) {
                            // Log a warning if the icon already exists
                            $this->command->warn('The icon already exists: '.$iconKey);

                            // Skip the icon creation
                            continue;
                        }

                        // Add the icon to the icons to create array
                        $iconsToCreate[$iconKey] = [
                            'name' => $iconName,
                            'type' => $iconType,
                            'style' => $iconStyle ?? null,
                            'prefix' => $iconSetPrefix,
                            'svg_file_path' => $iconPath,
                            'class' => $iconSetClass,
                            'set' => $iconSetName ?? 'custom',
                            'is_builtin' => true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }

                    // Free memory after each chunk
                    gc_collect_cycles();

                    // Finish the icon chunk progress bar
                    $this->iconChunkProgressBar->finish();
                }
                // Submit the icons to the database in bulk
                $this->bulkCreateIcons($iconsToCreate, $this->iconCount, $iconSetName);

                // Clear the icons to create array after each bulk creation batch
                $iconsToCreate = [];

                // Free memory after each chunk
                gc_collect_cycles();

                // Finish the icon progress bar
                $this->iconProgressBar->finish();

                // Log a message when the icon set is completed
                $this->command->info('Icon set completed: '.$iconSetName);

                // Advance the icon set progress bar
                $this->iconSetProgressBar->advance(1);
            }

            // Free memory after each chunk
            gc_collect_cycles();
        }

        // Finish the icon set progress bar
        $this->iconSetProgressBar->finish();
    }

    /**
     * Get the icons present in the set path
     *
     * @return array $icons
     *
     * @throws FileNotFoundException
     * @throws SvgNotFound
     */
    private function getIcons(string $iconSetPath): array
    {
        // Initialize the icons array
        $icons = [];

        // Initialize the return array
        $return = [];

        // Absolute path to the icon set (remove 'public/' from the path)
        $absolutePath = Str::replaceFirst('public/', '', $iconSetPath);

        // Get the icons (svg files) from the set path
        $icons = $this->filesystem->files(public_path($absolutePath));

        // Make sure the icons are not empty, and only contain svg files
        if (empty($icons)) {
            // Log an error if no icons are found
            $this->command->error('No icons found in the set path: '.$iconSetPath);
        } else {
            // Chunk the icons to avoid memory overload/segfault
            foreach (array_chunk($icons, $this->iconChunkSize) as $iconChunk) {
                // Loop through the icons
                foreach ($iconChunk as $icon) {
                    // Get only the files with the .svg extension
                    if ($this->filesystem->extension($icon) === 'svg') {
                        // Get the contents of the svg file for validation/sanitization
                        $svgCode = $this->filesystem->get($icon);

                        // Validate the SVG code
                        $isValid = $this->svgSanitizer->validate($svgCode);

                        // if the SVG is valid, add it to the return array, and sanitize the SVG code
                        if ($isValid) {
                            // Sanitize the SVG code
                            $sanitizedSvg = $this->svgSanitizer->sanitize($svgCode);

                            // Append the icon to the return array
                            $return[] = [
                                'name' => $this->filesystem->name($icon),
                                'path' => $icon,
                            ];
                        } else {
                            // Log an error if the SVG file is not valid
                            $this->command->error('The SVG file is not valid or is unsafe: '.$icon);
                        }
                    } else {
                        // Log a warning if the file is not an SVG file
                        $this->command->warn('The file is not an SVG file: '.$icon);
                    }
                }

                // Free memory after each chunk
                gc_collect_cycles();
            }

            // Return the icons
            return $return;
        }

        // Log an error if the icons are empty
        $this->command->error('No icons found in the set path: '.$iconSetPath);
        Log::error('No icons found in the set path: '.$iconSetPath);

        // Return an empty array if no icons are found
        return [];
    }

    /**
     * Get the type and style of the icon from the set name
     */
    private function getIconTypeAndStyle(string $iconSetName): array
    {
        // Initialize the return array
        $return = [];

        // Get the icon type and style from the icon set name
        $iconTypeAndStyle = explode('-', $iconSetName);

        // Get the icon type
        $iconType = $iconTypeAndStyle[0] ?? 'custom';

        // Get the icon style
        $iconStyle = $iconTypeAndStyle[1] ?? null;

        // Check if the icon style is valid
        if (in_array($iconStyle, $this->styleEnum, true)) {
            // Add the icon type and style to the return array
            $return['type'] = $iconType;
            $return['style'] = $iconStyle;
        } else {
            // Log a warning if the icon style is invalid, and return null
            Log::warning('The icon style is invalid: '.$iconStyle);

            // Add the icon type and style to the return array
            $return['type'] = $iconType;
            $return['style'] = null;
        }

        // Return the icon type and style
        return $return;
    }

    /**
     * Bulk create icons in the database
     */
    private function bulkCreateIcons(array $iconsToCreate, int $iconCount, string $iconSetName): void
    {
        // Define the chunk size for bulk creation
        $bulkChunkSize = 10;

        // Log a message when the icons are being created about how many icons are being created
        $this->command->info('Creating '.$iconCount.'icons: '.$iconSetName);

        // Try to bulk create the icons in the database in chunks
        try {
            // Chunk the icons to avoid memory overload/segfault
            foreach (array_chunk($iconsToCreate, $bulkChunkSize) as $iconChunk) {
                // Bulk create the icons in the database
                Icon::insert($iconChunk);

                // Advance the icon progress bar
                $this->iconProgressBar->advance(count($iconChunk));

                // Count down the number of icons
                $iconCount -= count($iconChunk);

                // Log a message when the icons are created
                $this->command->info('Icons created: '.count($iconChunk));

                // Free memory after each chunk
                gc_collect_cycles();
            }
        } catch (Exception $e) {
            // Log an error if the icons could not be created
            $this->command->error('The icons could not be created: '.$iconSetName.' Error: '.$e->getMessage());
            // Log an error if the icons could not be created
            Log::error('The icons could not be created: '.$iconSetName.' Error: '.$e->getMessage());
        }

        // Free memory after each chunk
        gc_collect_cycles();

        // Log a message when the icons are created
        $this->command->info('Icons created: '.$iconCount.' '.$iconSetName);
    }
}
