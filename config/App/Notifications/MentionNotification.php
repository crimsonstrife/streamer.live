<?php

namespace App\Notifications;

use App\Utilities\BlogHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class MentionNotification extends Notification
{
    use Queueable;

    /**
     * The Comment instance.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    public $model;

    /**
     * Create a new notification instance.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    public function __construct($model)
    {
        $this->model = $model;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     *
     * @return array
     */
    public function via($notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     *
     * @return array
     */
    public function toDatabase(mixed $notifiable): array
    {
        // In this instance `$this->model` represents the `comment` model.
        $commentingUser = $this->model->commentedBy();
        $username = $commentingUser->username;
        $modelId = $this->model->getKey();
        $post = $this->model->commentedOn();
        $postSlug = $post->slug;
        $blogSlug = BlogHelper::getBlogSlug();

        $message = "<strong>@{ $username }</strong> has mentioned you in their comment!";

        $link = "{ $blogSlug }/{ $postSlug }";

        return [
            'message' => $message,
            'link' => $link,
            'type' => 'mention'
        ];
    }
}
