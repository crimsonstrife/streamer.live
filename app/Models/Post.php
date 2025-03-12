<?php

namespace App\Models;

use App\Contracts\CommentableContract;
use App\Enums\Sort;
use App\Traits\HasComments;
use App\Traits\HasReactions;
use App\Traits\HasSlug;
use Stephenjude\FilamentBlog\Models\Post as BasePost;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia as SpatieHasMedia;
use Spatie\Sluggable\SlugOptions;
use Spatie\Tags\HasTags;

class Post extends BasePost implements CommentableContract
{
    use HasReactions;
    use HasSlug;
    use HasComments;
    use HasReactions;
    use HasTags;

    /**
     * @var string
     */
    protected $table = 'blog_posts';

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'banner',
        'content',
        'published_at',
        'blog_author_id',
        'blog_category_id',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * @var array<string>
     */
    protected $appends = [
        'banner_url',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom($this->slugSourceColumn())
            ->saveSlugsTo('slug');
    }

    public function getSortOrder(): Sort
    {
        return Sort::NEWEST();
    }

    public function canReportComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public function canReplyToComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public function canReactToComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // If there is no slug provided, generate one from the title
            $currentSlug = $model->slug;

            if ($currentSlug === '' || $currentSlug === null) {
                $model->slug = $model->generateSlug();
            }
        });

        static::updating(function ($model) {
            // If there is no slug provided, generate one from the title, otherwise keep the existing slug
            $currentSlug = $model->slug;

            if ($currentSlug === '' || $currentSlug === null) {
                $model->slug = $model->generateSlug();
            } else {
                $model->slug = $currentSlug;
            }
        });
    }

    /**
     * Get the column that serves as the source for the slug.
     * Default is 'title', but it can be customized per model.
     */
    protected function slugSourceColumn(): string
    {
        return $this->slugSource ?? 'title';
    }

    public function bannerUrl(): Attribute
    {
        return Attribute::get(fn () => $this->banner ? asset(Storage::url($this->banner)) : '');
    }

    public function scopePublished(Builder $query)
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeDraft(Builder $query)
    {
        return $query->whereNull('published_at');
    }

    public function author(): BelongsTo
    {
        $author = $this->belongsTo(Author::class, 'blog_author_id');

        if ($author === null) {
            // If the author relationship is not found, check for the owner relationship
            $author = $this->owner();

            if ($author === null) {
                // If the owner relationship is not found, get the 'created_by' relationship
                $author = $this->createdBy();
            }
        }

        return $author;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'blog_category_id');
    }

    public static function rules(): array
    {
        return [
            'slug' => 'nullable|alpha_dash|unique:posts,slug',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Get the owner of the blog post.
     * This is an alias for the author method.
     *
     * @return BelongsTo|null The relationship to the owner or null if no owner exists.
     */
    public function owner(): BelongsTo|null
    {
        return $this->author();
    }
}
