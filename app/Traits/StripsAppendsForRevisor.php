<?php

namespace App\Traits;

trait StripsAppendsForRevisor
{
    /**
     * Concrete classes must use PHP trait conflict resolution to wire up
     * the three alias names this trait calls:
     *
     *   use HasRevisor, StripsAppendsForRevisor {
     *       StripsAppendsForRevisor::applyStateToPublishedRecord insteadof HasRevisor;
     *       StripsAppendsForRevisor::saveNewVersion               insteadof HasRevisor;
     *       StripsAppendsForRevisor::syncToCurrentVersionRecord   insteadof HasRevisor;
     *       HasRevisor::applyStateToPublishedRecord as revisorApplyStateToPublishedRecord;
     *       HasRevisor::saveNewVersion               as revisorSaveNewVersion;
     *       HasRevisor::syncToCurrentVersionRecord   as revisorSyncToCurrentVersionRecord;
     *   }
     *
     * This keeps the appends-stripping logic in one place: if Revisor adds
     * more methods that must run without virtual $appends, update this trait
     * rather than every model.
     */

    /**
     * Strip virtual $appends before publishing so computed accessors are
     * never written into the published table as real columns.
     */
    public function applyStateToPublishedRecord(): static
    {
        $appends = $this->getAppends();
        $this->setAppends([]);
        $this->revisorApplyStateToPublishedRecord();
        $this->setAppends($appends);

        return $this;
    }

    /**
     * Strip virtual $appends before versioning so computed accessors are
     * never written into the versions table as real columns.
     */
    public function saveNewVersion(): static|bool
    {
        $appends = $this->getAppends();
        $this->setAppends([]);
        $result = $this->revisorSaveNewVersion();
        $this->setAppends($appends);

        return $result;
    }

    /**
     * Strip virtual $appends before syncing to the current version record
     * so computed accessors are never written as real columns.
     */
    public function syncToCurrentVersionRecord(): static|bool
    {
        $appends = $this->getAppends();
        $this->setAppends([]);
        $result = $this->revisorSyncToCurrentVersionRecord();
        $this->setAppends($appends);

        return $result;
    }
}
