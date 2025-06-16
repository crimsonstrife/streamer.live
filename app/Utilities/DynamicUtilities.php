<?php

namespace App\Utilities;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

use function Laravel\Prompts\info;
use function Laravel\Prompts\warning;
use function Laravel\Prompts\error;

trait DynamicUtilities
{
    /**
     * Get all models with a specified trait.
     * @param mixed $traitName The name of the trait to search for.
     * @return array<string> The names of all models with the specified trait.
     * @example DynamicModelUtils::getModelsByTrait('HasRoles');
     */
    public static function getModelsByTrait(string $traitName): array
    {
        //set the path to the models directory
        $path = app_path('Models');

        //get all files in the models directory and subdirectories
        $files = File::allFiles($path);

        // If no files are found, output an error message and return an empty array
        if (count($files) === 0) {
            Log::error('No files found in ' . $path);
            return [];
        }

        //initialize an empty array to store the names of the models with the specified trait
        $models = [];

        //loop through each file in the models directory
        foreach ($files as $file) {
            //get the model class
            $class = $file->getBasename('.php');

            //get the path to the file
            $filePath = $file->getPathname();

            //get the namespace of the file
            $namespace = self::getNamespaceFromFile($filePath);

            //add the namespace to the class name
            $class = $namespace . '\\' . $class;

            //prevent errors if the class does not exist
            if (!class_exists($class)) {
                //output an error message and continue to the next class
                Log::warning('Class ' . $class . ' does not exist');

                //continue to the next class
                continue;
            }

            //check if the class has the specified trait
            if (self::HasTrait($class, $traitName)) {
                //add the model class to the models array
                $models[] = $class;
            } else {
                //output a message if the class does not have the specified trait
                Log::warning('Class ' . $class . ' does not have trait ' . $traitName);

                //continue to the next class
                continue;
            }
        }

        //output a message with the number of models found
        if (count($models) === 0) {
            Log::error('No models found with trait ' . $traitName);
        } else {
            Log::debug('Found ' . count($models) . ' models with trait ' . $traitName);
        }

        //return the array
        return $models;
    }

    /**
     * Check if a class has a specified trait.
     * @param mixed $class The class to check.
     * @param mixed $traitName The name of the trait to search for.
     * @return bool True if the class has the specified trait, false otherwise.
     * @example DynamicModelUtils::classHasTrait('App\Models\User', 'HasRoles');
     */
    public static function HasTrait(string $class, string $traitName): bool
    {
        //Check if the class exists
        if (!class_exists($class)) {
            Log::error('Class ' . $class . ' does not exist');
            //return false if the class does not exist
            return false;
        }

        $traits = class_uses($class); //Get all traits used by the class

        //Return true if the class uses the specified trait
        if (isset($traits[$traitName])) {
            return true;
        }

        //Check parent classes
        $parent = get_parent_class($class);

        //Return false if the class does not have a parent class
        if ($parent === false) {
            Log::error('Class ' . $class . ' does not use the trait ' . $traitName . ' and does not have a parent class that uses it either.');
            return false;
        }

        //Do while loop to check all parent classes
        while ($parent !== false) {
            $traits = class_uses($parent); //Get all traits used by the parent class

            //Return true if the parent class uses the specified trait
            if (isset($traits[$traitName])) {
                return true;
            }

            //Get the parent class of the parent class
            $parent = get_parent_class($parent);
        }

        Log::error('Class ' . $class . ' does not use the trait ' . $traitName . ' and none of its parent classes use it either.');
        //Return false if the class and all its parent classes do not use the specified trait
        return false;
    }

    /**
     * Get the namespace of a file.
     * @param mixed $file The file to get the namespace from.
     * @return string The namespace of the file, e.g. 'App\Models\...'
     * @example DynamicModelUtils::getNamespaceFromFile('app/Models/AuthObjects/User.php');
     */
    public static function getNamespaceFromFile(string $file): string
    {
        //get the contents of the file
        $contents = file_get_contents($file);

        //match the namespace using a regular expression
        preg_match('/namespace\s+(.*);/', $contents, $matches); //match the namespace

        //return the namespace
        return $matches[1];
    }

    /**
     * Get the Permission Formatted Name for a model.
     * @param mixed $model The model to get the permission formatted name for.
     * @return string The permission formatted name for the model. e.g. 'user' -> 'User', 'user_role' -> 'User Role', 'UserRole' -> 'User Role', etc.
     */
    public static function getNameForPermission(string $model): string
    {
        //Get the Base Name of the Model
        $model = class_basename($model);

        //replace special characters (e.g. underscores, dashes/hyphens, etc) with spaces
        $model = str_replace(['_', '-'], ' ', $model);

        //Split the model name into words, where each word is separated by a space, split by camel case, or split by uppercase letters.
        $model = preg_split('/(?=[A-Z])|(?<=[a-z])(?=[A-Z])|[_-]/', $model);

        //Capitalize the first letter of each word
        $model = array_map('ucfirst', $model);

        //Join the words back together with spaces as a string
        $model = implode(' ', $model);

        //trim any leading or trailing whitespace
        $model = trim($model);

        //return the formatted name
        return $model;
    }
}
