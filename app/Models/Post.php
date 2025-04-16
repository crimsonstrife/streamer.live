<?php

namespace App\Models;

use App\Contracts\CommentableContract;
use App\Enums\Sort;
use App\Traits\HasComments;
use App\Traits\HasReactions;
use App\Traits\HasSlug;
use ArrayAccess;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use LaravelIdea\Helper\App\Models\_IH_Post_QB;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
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
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \LakM\Comments\Models\Comment> $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Reaction> $reactions
 * @property-read int|null $reactions_count
 * @property \Illuminate\Database\Eloquent\Collection<int, Tag> $tags
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
class Post extends BasePost implements CommentableContract, Searchable
{
    use HasComments;
    use HasReactions;
    use HasReactions;
    use HasSlug;
    use HasTags;

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

    public static function boot(): void
    {
        parent::boot();

        static::creating(static function ($model) {
            // If there is no slug provided, generate one from the title
            $currentSlug = $model->slug;

            if ($currentSlug === '' || $currentSlug === null) {
                $model->slug = $model->generateSlug();
            }
        });

        static::updating(static function ($model) {
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

    public function scopePublished(Builder $query): \LaravelIdea\Helper\Stephenjude\FilamentBlog\Models\_IH_Post_QB|Builder|_IH_Post_QB
    {
        return $query->whereNotNull('published_at');
    }

    public function scopeDraft(Builder $query): \LaravelIdea\Helper\Stephenjude\FilamentBlog\Models\_IH_Post_QB|Builder|_IH_Post_QB
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
        $url = route('blog.post', $this->slug);

        return new SearchResult(
            $this,
            $this->title,
            $url
        );
    }
}
