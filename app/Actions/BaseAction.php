<?php

namespace App\Actions;

use Exception;
use RuntimeException;
use Illuminate\Support\Facades\DB;

/**
 * Class BaseAction
 *
 * This abstract class provides a template for actions that require database transactions.
 *
 * @package App\Actions
 */
abstract class BaseAction
{
    /**
     * The method to be implemented by subclasses to define the transactional logic.
     *
     * @return mixed The result of the transaction.
     */
    abstract protected function transact(): mixed;

    /**
     * Execute the action within a database transaction.
     *
     * @return mixed The result of the transaction.
     * @throws RuntimeException If an exception occurs during the transaction.
     */
    public function execute(): mixed
    {
        DB::beginTransaction();

        try {
            $result = $this->transact();
            DB::commit();

            return $result;
        } catch (Exception $e) {
            DB::rollBack();
            throw new RuntimeException('An exception occurred during an Action transaction.', 0, $e);
        }
    }
}
