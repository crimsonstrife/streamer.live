<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeContract extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:contract {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a new contract interface';

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return app_path('Console/Commands/stubs/make-contract.stub');
    }

    /**
     * Get the default namespace for the class.
     *
     * @param string $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\Contracts';
    }

    /**
     * Replace the class name for the given stub.
     *
     * @param string $stub
     * @param string $name
     * @return string
     */
    protected function replaceClass($stub, $name)
    {
        $stub = parent::replaceClass($stub, $name);

        //trim to get the class name. For example, App\Contracts\MyContract will be MyContract
        $name = class_basename($name);

        return str_replace('{{ class }}', $name, $stub);
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        parent::handle();
    }
}
