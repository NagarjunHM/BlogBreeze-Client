# React Router Structure

Below is the structure of your React Router, including a short description of the expected data for each route.

## Public Routes

- **Home Page (/):**
  Public route displaying the homepage.

- **Blog Detail Page (/blogs/:blogId):**
  Public route displaying details of a specific blog based on `:blogId`.

- **Tag Detail Page (/tags/:tagId):**
  Public route displaying details of a specific tag based on `:tagId`.

- **User Profile Page (/users/:userId):**
  Public route displaying details of a specific user based on `:userId`.

- **Login Page (/login):**
  Public route for user login.

- **Register Page (/register):**
  Public route for user registration.

## Private Routes (Requires Authentication)

- **Create Blog Page (/create-blog):**
  Private route requiring authentication for creating a new blog.

- **Edit Blog Page (/edit-blog/:blogId):**
  Private route requiring authentication for editing an existing blog based on `:blogId`.

- **Create Tag Page (/create-tag):**
  Private route requiring authentication for creating a new tag.

- **Edit Tag Page (/edit-tag/:tagId):**
  Private route requiring authentication for editing an existing tag based on `:tagId`.

- **User Settings Page (/settings):**
  Private route requiring authentication for user settings.

- **Notifications Page (/notifications):**
  Private route requiring authentication for displaying user notifications.

- **Following Page (/following):**
  Private route requiring authentication for displaying users followed by the current user.

- **Liked Blogs Page (/liked-blogs):**
  Private route requiring authentication for displaying blogs liked by the current user.

- **Draft Blogs Page (/draft-blogs):**
  Private route requiring authentication for displaying drafts created by the current user.

- **Create Comment Page (/blogs/:blogId/create-comment):**
  Private route requiring authentication for creating a comment on a specific blog based on `:blogId`.

- **Edit Comment Page (/comments/:commentId/edit):**
  Private route requiring authentication for editing a comment based on `:commentId`.

- **Followed Tags Page (/followed-tags):**
  Private route requiring authentication for displaying tags followed by the current user.

## 404 Page Not Found

- **Page Not Found (/\*):**
  Public route displaying a 404 Page Not Found for any unmatched routes.

---

<p>&nbsp<p>

# Day 1: Set Up the Project and Create Basic Components

- Set up a new React project using Create React App or your preferred method.
- Create basic components for `HomePage`, `BlogDetailPage`, `TagDetailPage`, `UserProfilePage`, `LoginPage`, `RegisterPage`, and `PageNotFound`.
- Implement routing using React Router to connect these components.

# Day 2: Create `PrivateRoute` Component and Implement Authentication

- Implement a `PrivateRoute` component that checks if the user is authenticated before rendering the specified component.
- Integrate authentication logic using tokens and state management (Redux, Context API, etc.).
- Test authentication by protecting one of the private routes (e.g., `CreateBlogPage`) and ensuring it works as expected.

# Day 3: Design and Implement `CreateBlogPage` and `EditBlogPage`

- Design the `CreateBlogPage` form for users to create new blog posts.
- Implement functionality to submit the form data to the backend API endpoint for creating a new blog.
- Design the `EditBlogPage` form for users to edit existing blog posts.
- Implement functionality to fetch blog details and update the backend when the form is submitted.

# Day 4: Design and Implement `CreateTagPage` and `EditTagPage`

- Design the `CreateTagPage` form for users to create new tags.
- Implement functionality to submit the form data to the backend API endpoint for creating a new tag.
- Design the `EditTagPage` form for users to edit existing tags.
- Implement functionality to fetch tag details and update the backend when the form is submitted.

# Day 5: Implement `UserSettingsPage`, `NotificationsPage`, and `FollowingPage`

- Design and implement the `UserSettingsPage` to allow users to update their profile information.
- Design and implement the `NotificationsPage` to display user notifications.
- Design and implement the `FollowingPage` to display users followed by the current user.

# Day 6: Implement `LikedBlogsPage`, `DraftBlogsPage`, and `CreateCommentPage`

- Design and implement the `LikedBlogsPage` to display blogs liked by the current user.
- Design and implement the `DraftBlogsPage` to display drafts created by the current user.
- Design and implement the `CreateCommentPage` to allow users to create comments on blog posts.

# Day 7: Implement `EditCommentPage` and `FollowedTagsPage`

- Design and implement the `EditCommentPage` to allow users to edit their comments.
- Design and implement the `FollowedTagsPage` to display tags followed by the current user.
- Perform thorough testing and debugging to ensure the entire application works seamlessly.
