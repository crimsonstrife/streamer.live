<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeConfig extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:config
    {name : The name of the config file, without the .php extension}
    {description : The description of the config file}
    {--keys=* : A list of keys to be added to the generated file}
    {--values=* : A list of values to be added to the generated file, in the same order as the keys}
    {--default=* : A list of default values to be added to the keys, maintain the same order. If not provided, the default value will be null}
    {--force : Overwrite the file if it already exists}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new utility class';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub(): string
    {
        return app_path('Console/Commands/stubs/make-config.stub');
    }

    /**
     * Generates a string representation of configuration contents.
     *
     * @param iterable $keys The keys to be included in the configuration.
     * @param iterable $values The values corresponding to the keys.
     * @param iterable $defaults The default values for the configuration.
     * @return string The generated configuration contents as a string.
     */
    private function generateContents(iterable $keys = [], iterable $values = [], iterable $defaults = []): string
    {
        $lines = []; // Declare the array to store the lines, it will be left empty if no keys are provided
        $maxKeyLength = 0; // Declare the variable to store the maximum length of the keys, it will be used to align the keys in the generated file
        $maxValueLength = 0; // Declare the variable to store the maximum length of the values, it will be used to align the values in the generated file
        $maxDefaultLength = 0; // Declare the variable to store the maximum length of the default values, it will be used to align the default values in the generated file
        $contents = ''; // Declare the variable to store the final contents of the generated file

        // Get the stub file contents
        $stub = $this->getStub();

        // Count the number of keys, values, and defaults, set them to dummy values if they are not provided
        if (count($keys) === 0) {
            $keys = ['key1', 'key2', 'key3'];
        }
        if (count($values) === 0) {
            $values = ['value1', 'value2', 'value3'];
        }
        if (count($defaults) === 0) {
            $defaults = ['null', 'null', 'null'];
        }

        // Get the maximum length of the keys, values, and defaults
        foreach ($keys as $key) {
            $maxKeyLength = max($maxKeyLength, strlen($key));
        }
        foreach ($values as $value) {
            $maxValueLength = max($maxValueLength, strlen($value));
        }
        foreach ($defaults as $default) {
            $maxDefaultLength = max($maxDefaultLength, strlen($default));
        }

        // Generate the lines for the file
        $lines[] = "\t";
        foreach ($keys as $index => $key) {
            $lines[] = "\t'$key'" . str_repeat(' ', $maxKeyLength - strlen($key)) . " => '$values[$index]'" . str_repeat(' ', $maxValueLength - strlen($values[$index])) . " // Default: $defaults[$index]";
        }
        $lines[] = "\t";

        // Replace the placeholder in the stub file with the generated lines
        return str_replace('{{ lines }}', implode("\n", $lines), $stub);
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Get the arguments and options
        $name = $this->argument('name');
        $description = $this->argument('description');
        $keys = $this->option('keys');
        $values = $this->option('values');
        $defaults = $this->option('default');
        $force = $this->option('force');

        // Validate the name
        if (!preg_match('/^\w[\w\-]+$/', $name)) {
            $this->error("Only alphanumeric characters, _ and - are allowed for the file name.");
            return;
        }

        if (preg_match('/^\d/', $name)) {
            $this->error("The file name cannot start with a number.");
            return;
        }

        if (preg_match('/\.php$/i', $name)) {
            $this->error("The file name must not end in .php.");
            return;
        }

        // Set the name lowercase for the file name, if the provided name is snake case then hyphenate it as lowercase
        $fileName = strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $name));

        // Check if the file already exists
        if (file_exists(config_path($fileName . '.php')) && !$force) {
            $this->error('The config file already exists. Use the --force option to overwrite it.');
            return;
        }

        // Validate the keys, values, and defaults
        if (count($keys) !== count($values) || count($keys) !== count($defaults)) {
            $this->error('The number of keys, values, and defaults must be the same.');
            return;
        }
        foreach ($keys as $key) {
            if (!preg_match('/^\w+$/', $key)) {
                $this->error("Only alphanumeric characters and _ are allowed for the keys.");
                return;
            }
        }

        // Generate the contents of the configuration file
        $contents = $this->generateContents($keys, $values, $defaults);

        // Add the name and description to the contents
        $contents = str_replace(array('{{ name }}', '{{ description }}'), array($name, $description), $contents);

        // Write the contents to the file
        $file = file_put_contents(config_path($fileName . '.php'), $contents);

        // Check if the file was created successfully and return the appropriate message
        if ($file) {
            $this->info('The config file has been created successfully.');
        } else {
            $this->error('An error occurred while creating the config file.');
        }
    }
}
