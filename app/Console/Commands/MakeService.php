<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Contracts\Filesystem\FileNotFoundException;

class MakeService extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub(): string
    {
        return app_path('Console/Commands/stubs/make-service.stub');
    }

    /**
     * Get the default namespace for the class.
     *
     * @param string $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\Services';
    }

    /**
     * Replace the class name for the given stub.
     *
     * @param string $stub
     * @param string $name
     * @return string
     */
    protected function replaceClass($stub, $name): string
    {
        $stub = parent::replaceClass($stub, $name);

        //trim to get the class name. For example, App\Utilities\DummyService will be DummyService
        $name = class_basename($name);

        return str_replace('{{ class }}', $name, $stub);
    }

    /**
     * Replace the namespace in the given stub with the provided name.
     *
     * @param string $stub The stub content where the namespace will be replaced.
     * @param string $name The name that will replace the namespace in the stub.
     * @return void The stub content with the replaced namespace.
     */
    protected function replaceNamespace(&$stub, $name): void
    {
        $stub = parent::replaceNamespace($stub, $name);
    }

    /**
     * Execute the console command.
     * @throws FileNotFoundException
     */
    public function handle(): void
    {
        parent::handle();
    }
}
