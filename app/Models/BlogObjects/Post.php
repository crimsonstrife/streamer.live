<?php

namespace App\Models\BlogObjects;

use App\Contracts\CommentableContract;
use App\Enums\Sort;
use App\Models\AuthObjects\User;
use App\Models\Media;
use App\Models\SharedObjects\Category;
use App\Traits\HasComments;
use App\Traits\HasReactions;
use App\Traits\HasSlug;
use App\Traits\IsPermissible;
use App\Utilities\BlogHelper;
use ArrayAccess;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use LaravelIdea\Helper\Stephenjude\FilamentBlog\Models\_IH_Post_QB;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;
use Spatie\Sluggable\SlugOptions;
use Spatie\Tags\HasTags;
use Spatie\Tags\Tag;
use Stephenjude\FilamentBlog\Models\Post as BasePost;

/**
 * @property int $id
 * @property int|null $blog_author_id
 * @property int|null $blog_category_id
 * @property string $title
 * @property string $slug
 * @property string|null $excerpt
 * @property string|null $banner
 * @property string $content
 * @property Carbon|null $published_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read mixed $banner_url
 * @property-read Collection<int, \LakM\Comments\Models\Comment> $comments
 * @property-read int|null $comments_count
 * @property-read Collection<int, Reaction> $reactions
 * @property-read int|null $reactions_count
 * @property Collection<int, Tag> $tags
 * @property-read int|null $tags_count
 *
 * @method static Builder<static>|Post draft()
 * @method static Builder<static>|Post newModelQuery()
 * @method static Builder<static>|Post newQuery()
 * @method static Builder<static>|Post published()
 * @method static Builder<static>|Post query()
 * @method static Builder<static>|Post whereBanner($value)
 * @method static Builder<static>|Post whereBlogAuthorId($value)
 * @method static Builder<static>|Post whereBlogCategoryId($value)
 * @method static Builder<static>|Post whereContent($value)
 * @method static Builder<static>|Post whereCreatedAt($value)
 * @method static Builder<static>|Post whereExcerpt($value)
 * @method static Builder<static>|Post whereId($value)
 * @method static Builder<static>|Post wherePublishedAt($value)
 * @method static Builder<static>|Post whereSlug($value)
 * @method static Builder<static>|Post whereTitle($value)
 * @method static Builder<static>|Post whereUpdatedAt($value)
 * @method static Builder<static>|Post withAllTags(ArrayAccess|Tag|array|string $tags, ?string $type = null)
 * @method static Builder<static>|Post withAllTagsOfAnyType($tags)
 * @method static Builder<static>|Post withAnyTags(ArrayAccess|Tag|array|string $tags, ?string $type = null)
 * @method static Builder<static>|Post withAnyTagsOfAnyType($tags)
 * @method static Builder<static>|Post withAnyTagsOfType(array|string $type)
 * @method static Builder<static>|Post withoutTags(ArrayAccess|Tag|array|string $tags, ?string $type = null)
 *
 * @mixin Eloquent
 */
class Post extends BasePost implements CommentableContract, HasMedia, Searchable, Sitemapable
{
    use HasComments;
    use HasReactions;
    use HasSlug;
    use HasTags;
    use InteractsWithMedia;
    use IsPermissible;

    /**
     * @var string
     */
    protected $table = 'posts';

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
        'category_id',
        'comments_locked',
        'is_announcement',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'comments_locked' => 'bool',
        'is_announcement' => 'bool',
    ];

    /**
     * @var array<string>
     */
    protected $appends = [
        'banner_url',
        'has_banner',
        'featured_image'
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

    /**
     * Can someone post a comment on this post?
     */
    public function canComment(): bool
    {
        return $this->authCheck() && ! $this->isCommentingLocked();
    }

    public function canReportComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public function canReplyToComment(Comment $comment): bool
    {
        return $this->authCheck()
            && ! $this->isCommentingLocked()   // post-level lock
            && ! $comment->replies_locked; // comment-thread lock
    }

    public function canReactToComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public static function boot(): void
    {
        parent::boot();

        static::creating(static function ($model) {
            $currentSlug = $model->slug;

            if ($currentSlug === '' || $currentSlug === null) {
                $model->slug = $model->generateSlug();
            }
        });

        static::updating(static function ($model) {
            $currentSlug = $model->slug;

            if ($currentSlug === '' || $currentSlug === null) {
                $model->slug = $model->generateSlug();
            } else {
                $model->slug = $currentSlug;
            }
        });

        static::saved(function (Post $post) {
            BlogHelper::clearPostCache($post);
        });

        static::deleted(function (Post $post) {
            BlogHelper::clearPostCache($post);
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

    public function getHasBannerAttribute(): bool
    {
        return $this->banner !== null;
    }

    public function hasBanner(): bool
    {
        return $this->banner !== null;
    }

    public function scopePublished(Builder $query): Builder|_IH_Post_QB
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeDraft(Builder $query): Builder|_IH_Post_QB
    {
        return $query->whereNull('published_at');
    }

    public function scopeAnnouncements(Builder $query): Builder|_IH_Post_QB
    {
        return $query->whereNotNull('is_announcement', true);
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
        return $this->belongsTo(Category::class, 'category_id');
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
    public function owner(): ?BelongsTo
    {
        return $this->author();
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getSearchResult(): SearchResult
    {
        $url = route(BlogHelper::getBlogSlug().'.post', $this->slug);

        return new SearchResult(
            $this,
            $this->title,
            $url
        );
    }

    public function isCommentingLocked(): bool
    {
        return $this->comments_locked ?? false;
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->useDisk('public');
    }

    public function postFeaturedMedia(): morphOne
    {
        return $this
            ->morphOne(Media::class, 'model')
            ->where('model_type', 'App\Models\BlogObjects\Post') // only “posts” files
            ->where('collection_name', 'images');
    }

    public function getContentWithMediaAttribute(): string
    {
        return preg_replace_callback(
            '/\[media\s+id\s*=\s*(?:"(\d+)"|\'(\d+)\'|(\d+))\s*\]/',
            function ($matches) {
                // $matches[1], [2], or [3] will contain the ID depending on the match
                $id = $matches[1] ?? $matches[2] ?? $matches[3];
                $media = Media::find($id);

                return $media
                    ? '<img src="'.$media->getMediaUrl().'" alt="'.e($media->getCustomProperty('image_alt_text')).'"/>'
                    : '';
            },
            $this->content,
        );
    }

    public function canUserViewMedia(?User $user): bool
    {
        if ($this->published_at !== null) {
            return true;
        }

        // visitors cannot view unpublished items
        if ($user === null) {
            return false;
        }

        // admin overrides published status
        if ($user->can('is-admin') || $user->can('is-super-admin')) {
            return true;
        }

        if ($user->can('read-post')) {
            return true;
        }

        // authors can view their own unpublished posts
        $author = $this->author();
        $authorUser = $author->user();

        return $user->id === $authorUser->id;
    }

    public function canUserCreateMedia(User $user): bool
    {
        // admin overrides status and access
        return $user->can('is-admin') || $user->can('is-super-admin');
    }

    public function canUserDeleteMedia(User $user): bool
    {
        // admin overrides status and access
        return $user->can('is-admin') || $user->can('is-super-admin');
    }

    public function toSitemapTag(): Url|string|array
    {
        $blogSlug = BlogHelper::getBlogSlug();
        return Url::create($blogSlug.'/'.$this->slug)
            ->setLastModificationDate(Carbon::create($this->updated_at))
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
            ->setPriority(0.1);
    }

    public function getFeaturedImageAttribute(): ?string
    {
        return $this->getFirstMediaUrl();
    }
}
