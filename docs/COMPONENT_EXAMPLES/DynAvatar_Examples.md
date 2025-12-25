# DynAvatar Examples & Use Cases

**Component**: DynAvatar  
**Location**: `packages/dyn-ui-react/src/components/DynAvatar`  
**Status**: ✅ Production Ready (After PHASE 1 & 2)

---

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Variants](#variants)
3. [Status Indicators](#status-indicators)
4. [Interactive Mode](#interactive-mode)
5. [Custom Fallbacks](#custom-fallbacks)
6. [Loading & Error States](#loading--error-states)
7. [Accessibility](#accessibility)
8. [Complete Examples](#complete-examples)

---

## Basic Usage

### With Initials Only

When no image is provided, DynAvatar automatically generates initials from the `alt` text:

```tsx
import { DynAvatar } from '@dyn-ui/react';

// Displays "JD" initials
<DynAvatar alt="John Doe" />

// Displays "S" initials
<DynAvatar alt="Sarah" />

// Displays default icon (no alt provided)
<DynAvatar />
```

### With Image

Provide an image URL to display instead of initials:

```tsx
<DynAvatar
  src="/avatars/john-doe.jpg"
  alt="John Doe"
/>
```

### Custom Initials

Override automatic initials generation:

```tsx
<DynAvatar
  src="/avatars/john.jpg"
  alt="John Doe"
  initials="JD"  // Explicitly set initials
/>

<DynAvatar
  alt="Team Member"
  initials="TM"
/>
```

---

## Variants

### Sizes

DynAvatar supports 5 size variants:

```tsx
<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
  <DynAvatar alt="Test" size="xs" />   {/* 24px */}
  <DynAvatar alt="Test" size="sm" />   {/* 32px */}
  <DynAvatar alt="Test" size="md" />   {/* 40px - default */}
  <DynAvatar alt="Test" size="lg" />   {/* 56px */}
  <DynAvatar alt="Test" size="xl" />   {/* 80px */}
</div>
```

### Shapes

Three shape options are available:

```tsx
<div style={{ display: 'flex', gap: '16px' }}>
  <DynAvatar alt="Circle" shape="circle" />    {/* Default */}
  <DynAvatar alt="Square" shape="square" />
  <DynAvatar alt="Rounded" shape="rounded" />
</div>
```

### Size + Shape Combinations

```tsx
{/* Large rounded square avatar */}
<DynAvatar
  src="/avatars/user.jpg"
  alt="User Profile"
  size="lg"
  shape="rounded"
/>
```

---

## Status Indicators

Add status badges to show user availability:

```tsx
<div style={{ display: 'flex', gap: '24px' }}>
  <DynAvatar
    alt="Online User"
    status="online"
    src="/avatars/user1.jpg"
  />

  <DynAvatar
    alt="Away User"
    status="away"
    src="/avatars/user2.jpg"
  />

  <DynAvatar
    alt="Busy User"
    status="busy"
    src="/avatars/user3.jpg"
  />

  <DynAvatar
    alt="Offline User"
    status="offline"
    src="/avatars/user4.jpg"
  />
</div>
```

### Status with Different Sizes

```tsx
<DynAvatar
  src="/avatars/manager.jpg"
  alt="Manager"
  size="lg"
  status="online"
/>
```

---

## Interactive Mode

Enable click handlers to make avatars interactive:

```tsx
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();

  const handleAvatarClick = (event: React.MouseEvent) => {
    console.log('Avatar clicked');
    navigate('/profile');
  };

  return (
    <DynAvatar
      src="/avatars/current-user.jpg"
      alt="Your Profile"
      onClick={handleAvatarClick}
      title="Click to view profile"  // Tooltip
    />
  );
}
```

### Keyboard Navigation

Interactive avatars support keyboard activation:

```tsx
// User can click OR press Enter/Space to trigger onClick
<DynAvatar
  alt="User"
  onClick={() => alert('Avatar activated!')}
/>

// In browser:
// 1. Tab to avatar
// 2. Press Enter or Space
// 3. onClick handler fires
```

---

## Custom Fallbacks

### Text Fallback

```tsx
<DynAvatar
  alt="Team"
  fallback={<span>T</span>}
/>
```

### Icon Fallback

```tsx
import { UserIcon } from '@icons/user';

<DynAvatar
  alt="User"
  fallback={<UserIcon />}
/>
```

### Children Fallback

```tsx
<DynAvatar alt="Group">
  <GroupIcon />
</DynAvatar>
```

---

## Loading & Error States

### Loading State

Show a spinner while image is loading:

```tsx
function UserCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Simulate image loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <DynAvatar
      src="/avatars/user.jpg"
      alt="Loading User"
      loading={isLoading}
      error={imageError}
    />
  );
}
```

### Error State

Display error styling when image fails to load:

```tsx
<DynAvatar
  src="/invalid-url.jpg"  // Will fail to load
  alt="User"
  error={true}
/>
```

### Automatic Fallback on Error

DynAvatar automatically falls back to initials when image fails:

```tsx
// Image fails to load → shows "JD" initials instead
<DynAvatar
  src="/avatars/john-doe.jpg"  // 404 or network error
  alt="John Doe"
/>
```

---

## Accessibility

### ARIA Labels

```tsx
{/* Auto-generated from alt text */}
<DynAvatar alt="John Doe" />
// aria-label: "John Doe"

{/* Custom ARIA label */}
<DynAvatar
  src="/avatars/user.jpg"
  alt="Jane Smith"
  aria-label="Jane Smith - Team Lead"
/>
```

### Status Announcements

```tsx
<DynAvatar
  src="/avatars/user.jpg"
  alt="Bob Johnson"
  status="online"
/>
// Screen reader announces: "Bob Johnson (online)"
```

### Described Content

```tsx
function UserWithDescription() {
  return (
    <>
      <DynAvatar
        src="/avatars/user.jpg"
        alt="User"
        aria-describedby="user-description"
      />
      <p id="user-description">
        This is the user avatar. Click to view profile.
      </p>
    </>
  );
}
```

---

## Complete Examples

### User Card Component

```tsx
import { DynAvatar } from '@dyn-ui/react';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <DynAvatar
        src={user.avatar}
        alt={user.name}
        size="lg"
        status={user.isOnline ? 'online' : 'offline'}
        onClick={() => navigate(`/users/${user.id}`)}
      />
      <h3>{user.name}</h3>
      <p>{user.role}</p>
    </div>
  );
}
```

### User List

```tsx
function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          <DynAvatar
            src={user.avatar}
            alt={user.name}
            size="md"
            status={user.status}
          />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}
```

### Team Avatars Row

```tsx
function TeamAvatars({ team }) {
  return (
    <div className="team-avatars">
      <h4>Team: {team.name}</h4>
      <div style={{ display: 'flex', gap: '8px' }}>
        {team.members.map(member => (
          <DynAvatar
            key={member.id}
            src={member.avatar}
            alt={member.name}
            size="sm"
            status={member.status}
            title={member.name}
          />
        ))}
      </div>
    </div>
  );
}
```

### User Comment

```tsx
function CommentThread() {
  const comments = [
    {
      id: 1,
      author: { name: 'Alice Johnson', avatar: '/avatars/alice.jpg' },
      text: 'Great point!',
    },
    {
      id: 2,
      author: { name: 'Bob Smith', avatar: '/avatars/bob.jpg' },
      text: 'I agree!',
    },
  ];

  return (
    <div className="comments">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <DynAvatar
            src={comment.author.avatar}
            alt={comment.author.name}
            size="sm"
          />
          <div>
            <strong>{comment.author.name}</strong>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Profile Header

```tsx
function ProfileHeader({ user, onEdit }) {
  return (
    <div className="profile-header">
      <DynAvatar
        src={user.avatar}
        alt={user.name}
        size="xl"
        shape="rounded"
        onClick={onEdit}
      />
      <div>
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
        <span className="status-badge">
          {user.isOnline ? '🟢 Online' : '⚫ Offline'}
        </span>
      </div>
    </div>
  );
}
```

---

## Best Practices

### Do's ✅

- ✅ Always provide `alt` text for accessibility
- ✅ Use appropriate size for context (lg for profiles, sm for lists)
- ✅ Show status when available (helps with user presence)
- ✅ Use `onClick` for interactive avatars (e.g., profile links)
- ✅ Test with screen readers
- ✅ Provide loading states for better UX

### Don'ts ❌

- ❌ Don't forget `alt` text (breaks accessibility)
- ❌ Don't make all avatars interactive (only when needed)
- ❌ Don't use broken image URLs without error handling
- ❌ Don't force initials when image will load (let it auto-fallback)
- ❌ Don't use too many sizes in the same UI (stick to 2-3)

---

## Testing

```tsx
import { render, screen } from '@testing-library/react';
import { DynAvatar } from '@dyn-ui/react';

describe('DynAvatar', () => {
  it('renders initials when no image', () => {
    render(<DynAvatar alt="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows image when loaded', () => {
    render(
      <DynAvatar
        src="/avatars/user.jpg"
        alt="User"
      />
    );
    const img = screen.getByAltText('User');
    expect(img).toHaveAttribute('src', '/avatars/user.jpg');
  });

  it('shows status indicator', () => {
    render(
      <DynAvatar
        alt="User"
        status="online"
      />
    );
    expect(screen.getByTestId('dyn-avatar-status')).toBeInTheDocument();
  });
});
```

---

## Design Tokens

DynAvatar uses the following design tokens (Phase 1):

| Token | Default | Usage |
|-------|---------|-------|
| `--dyn-avatar-status-size` | `12px` | Status indicator size |
| `--dyn-avatar-badge-offset` | `-4px` | Badge position offset |
| `--dyn-avatar-badge-size` | `20px` | Badge size |
| `--dyn-avatar-badge-padding` | `0 4px` | Badge padding |
| `--dyn-avatar-group-margin-negative` | `-8px` | Group margin overlap |
| `--dyn-border-width` | `2px` | Default border width |

---

## Related Components

- `DynButton` - For interactive actions
- `DynBadge` - For status indicators (future)
- `DynTooltip` - For hover information

---

**Last Updated**: December 25, 2025  
**Status**: ✅ Complete  
**Version**: 1.0.0
