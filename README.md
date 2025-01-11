# Books and Films

Books and Films is a website designed for literature and movie enthusiasts who want to connect with a like-minded community, share their perspectives, and discover new works. It provides a centralized platform where users can immerse themselves in the world of books and movies through various features tailored to enhance their experience.

Users can write detailed reviews about their favorite books and films, highlighting what makes them unique or sharing constructive criticism. The platform encourages thoughtful discussion and allows for editing and deletion of reviews to keep content relevant and up-to-date.

By organizing content into categories and genres, Books and Films makes it easy for users to find what aligns with their preferences, whether they are fans of fantasy novels, thrillers, documentaries, or romance films. This targeted filtering ensures a more personalized browsing experience.

Interaction is a key aspect of the platform. Users can engage with the community by liking reviews, posting comments, and joining discussions. This social element fosters a sense of belonging and encourages users to explore different perspectives.

Why Users Would Choose Books and Films:
1. Discover New Content:
  Users looking for recommendations can browse reviews across diverse categories and genres, helping them find their next favorite book or movie.
2. Express Creativity:
  Aspiring critics can share their insights and develop their reviewing skills in a supportive environment.
3. Build Connections:
  The platform brings together literature and cinema enthusiasts, allowing them to connect, discuss, and form friendships based on shared interests.
4. Stay Organized:
  Users can create and manage their personal reviews, making it easier to track their thoughts on books and movies over time.
5. Empowered Decision-Making:
  Detailed reviews and ratings provide valuable insights, helping users make informed choices about what to read or watch next.
6. Customizable Exploration:
  With robust filters and genre-based navigation, users can tailor their experience, focusing on topics that matter most to them.
7. Contribute to a Growing Community:
  By sharing their thoughts, users actively participate in building a comprehensive and diverse library of reviews, benefitting the entire community.

Books and Films isn’t just a platform; it’s a hub for creativity, connection, and discovery, designed to elevate the experience of every literature and movie enthusiast. Whether you’re a casual fan or a dedicated critic, the site offers tools and opportunities to deepen your appreciation for the stories you love.

![Responsive Mockup](src/assets/images/all-devices-white.png)


# Wireframe

![Wireframe](src/assets/images/wireframe.png)

This wireframe design showcases the layout of a user-friendly webpage with key functional areas and a visually balanced structure. Below is a detailed description of the sections:

## 1. Header Section
- **Brand**: Positioned on the top-left, this space is reserved for the company logo or website name.
- **User Navigation Options**: A centralized area providing navigation links for users to explore the website's features or categories.
- **Search Options**: Located on the top-right, this section is designed for users to input queries for searching content.

## 2. Left Sidebar
- **Categories**: A vertical area on the left-hand side for listing different content categories or sections for easy navigation.

## 3. Main Content Area
- **Image Placeholder (Img)**: A large rectangular space in the center, representing the primary visual content, such as a banner, image, or product display.
- **User Image**: A circular overlay near the bottom-right of the main image, potentially for user profile pictures or interactive elements.
- **Link for Content**: A button or link directly beneath the main image, serving as a call-to-action or additional navigational element.

## 4. Right Sidebar
- **Favorites**: A designated area for users to save or view their favorite content.

This wireframe is ideal for creating a visually appealing and functional webpage, ensuring ease of navigation while emphasizing key elements like the main content and user interactivity.

---

## Features

### Existing Features

#### **Navigation Bar**

- Fully responsive navigation bar present on all pages.
- Includes links to home, user profile, categories, and the login/register page.
- Provides seamless navigation across the website for all users.
- Consistent design to enhance user experience.

  ![Navigation Bar](src/assets/images/navbar.jpeg)

#### **Home Page**

- Displays all reviews sorted by creation date.
- Features category filters and thumbnails for each review.
- Engages users with dynamic and visually appealing content.

  ![Home Page](src/assets/images/home.jpeg)

#### **Review Creation**

- Users can create a review with a title, author/director, content, genre, and optional image.
- Provides validation to ensure required fields are filled before submission.

  ![Create Review](src/assets/images/create_review.jpeg)

#### **Categories and Genres**

- Categories allow users to filter content based on their preferences.
- Dropdown menus for genres within each category make navigation intuitive.
- Each genre links to a filtered view displaying relevant reviews.

  ![Categories](src/assets/images/categories.jpeg)

#### **Review Details**

- Displays the full content of a review, including the title, author/director, genre, rating, and associated image.
- Allows users to like reviews and post comments.
- Includes options to edit or delete reviews if they are the author.

  ![Review Details](src/assets/images/review_details.jpeg)

#### **User Profile**

- Users can view and update their profile, including personal details and profile picture.
- Displays all reviews created by the user with options to edit or delete.
- Provides access to change the user’s password.

  ![User Profile](src/assets/images/profile.jpeg)
  ![User Edit Profile](src/assets/images/edit_profile.jpeg)

#### **Favorites**

- Users can mark profiles as favorites for quick access.
- Displays a grid of favorite profiles with links to their review lists.

  ![Favorites](src/assets/images/favorites.jpeg)

---

## Benefits of Using React

React is the cornerstone of the Books and Films platform, providing a robust, efficient, and user-friendly framework for building dynamic user interfaces. Here are some of the key benefits React offers to users:

### Enhanced Performance
React's virtual DOM ensures fast updates and rendering, providing a seamless and responsive user experience, even for data-intensive applications like Books and Films.

### Dynamic User Interface
With React's component-based architecture, the platform delivers a visually consistent and interactive design. Features like category filtering, dynamic review creation, and real-time updates feel natural and intuitive.

### Improved Interactivity
React's ability to manage state efficiently allows users to experience smooth interactions, such as liking reviews, posting comments, and editing profiles, without unnecessary page reloads.

### Responsive Design
React makes it easier to implement responsive designs that adapt seamlessly to different screen sizes and devices, ensuring a consistent experience for all users.

### Scalability
As Books and Films continues to grow, React's modular structure ensures that new features can be integrated with minimal disruption to the existing platform.

### Customizability
React's flexibility allows developers to create tailored components that enhance user engagement, such as personalized recommendations, interactive dashboards, and filtered content views.

### Community and Ecosystem
React's vast ecosystem of libraries and tools enhances development efficiency and ensures that the platform remains cutting-edge, benefitting users with faster updates and innovative features.

By leveraging React, Books and Films provides a responsive, scalable, and interactive platform that elevates the user experience, making it an ideal choice for enthusiasts of literature and cinema.

---

## Reusable Components in React

The Books and Films platform has been designed with modularity in mind, leveraging React's component-based architecture. This approach not only improves maintainability but also enables the reuse of components across different sections of the site. Below are some of the key reusable components:

### Navigation Bar
- **Description**: A fully responsive navigation bar that can be reused across all pages.
- **Features**:
  - Dynamic menu items based on user authentication status.
  - Consistent styling and responsiveness for both desktop and mobile views.
- **Use Cases**:
  - Included on the home page, user profile, and review details pages.

### Review Card
- **Description**: A component that displays a summary of a review, including the title, author/director, genre, and thumbnail image.
- **Features**:
  - Accepts props for review data, ensuring versatility for different contexts.
  - Includes functionality for liking reviews.
- **Use Cases**:
  - Displayed on the home page, category pages, and user profiles.

### Filter Dropdown
- **Description**: A dropdown component used for filtering content based on categories and genres.
- **Features**:
  - Dynamically renders options based on passed props.
  - Can handle events to update filtered results.
- **Use Cases**:
  - Found in category and genre filtering on the home page and other relevant views.

### Review Form
- **Description**: A form component for creating and editing reviews.
- **Features**:
  - Reusable validation logic for required fields.
  - Customizable input fields for title, content, genre, and image upload.
- **Use Cases**:
  - Used in the review creation and review editing functionalities.

### Comment Section
- **Description**: A component for displaying and managing comments on a review.
- **Features**:
  - Displays a list of comments with user details and timestamps.
  - Includes functionality for adding, editing, and deleting comments.
- **Use Cases**:
  - Embedded in the review details page.

### Profile Card
- **Description**: A compact display of user information, including their profile picture and name.
- **Features**:
  - Displays user-specific actions like viewing their reviews or favoriting their profile.
  - Designed for easy integration with grid layouts.
- **Use Cases**:
  - Displayed in the favorites section and user profile listings.

### Pagination Controls
- **Description**: A reusable pagination component for navigating through large datasets.
- **Features**:
  - Accepts props for the total number of pages, current page, and navigation handlers.
  - Consistent design for seamless integration.
- **Use Cases**:
  - Used in the home page, category pages, and user profiles to handle review listings.

### Modal
- **Description**: A versatile modal component for displaying content in a pop-up window.
- **Features**:
  - Configurable title, content, and action buttons.
  - Handles confirmation dialogs for sensitive actions like deleting reviews or comments.
- **Use Cases**:
  - Used in review deletion and confirmation dialogs across the platform.

### Notification Toast
- **Description**: A lightweight component for displaying temporary messages.
- **Features**:
  - Configurable message types (success, error, info).
  - Auto-dismiss functionality with customizable duration.
- **Use Cases**:
  - Displays feedback messages after actions like saving a review, liking a comment, or updating profile details.

### Image Upload Field
- **Description**: A reusable file input field for handling image uploads.
- **Features**:
  - Accepts props for default image preview and upload handlers.
  - Includes validation for supported file types and sizes.
- **Use Cases**:
  - Used in the profile creation, profile editing, and review creation forms.

By utilizing these reusable components, the Books and Films platform achieves a high level of consistency and efficiency. These components not only streamline development but also provide flexibility for future enhancements and feature additions.

---

### Features Left to Implement

- Password recovery through email service.
- Email validation.
- User feedback survey form.
- Enhanced statistics for user reviews (e.g., most liked or commented).
- Integration of a recommendation engine based on user preferences.

---

# API endpoints tests

This section describes the test for the **API endpoints**.
Tests for the endpoints were conducted, below are some examples of how to do the tests.

  ### How to Run the Test

  Use a tool like cURL, Postman, or similar to send the requests to the endpoint.
  Verify the response matches the expected status code and response body.

---

## Endpoint

`POST /register/`

 The endpoint allows a user to register by providing their `username`, `password`, and `email`. Optionally, a `profile_image` can be uploaded. The backend returns a success message and JWT tokens upon successful registration.

---

## Headers

 Content-Type: multipart/form-data

 ---

## Request Parameters

| Parameter      | Type       | Required | Description                         |
|----------------|------------|----------|-------------------------------------|
| `username`     | String     | Yes      | The username of the new user.       |
| `password`     | String     | Yes      | The password for the new account.   |
| `email`        | String     | Yes      | The user's email address.           |
| `profile_image`| File       | No       | An optional profile image file.     |

---

## Request Example (cURL)

 Access the terminal and paste the following example:

```bash
curl -X POST https://books-and-films-api-e4ea62133d4f.herokuapp.com/register/ \
  -H "Content-Type: multipart/form-data" \
  -F "username=testuser" \
  -F "password=TestPassword123" \
  -F "email=testuser@example.com" \
  ```

If successful, a message will be displayed:
   ![endpoint test](src/assets/images/FE8F78BF-D38B-4667-899C-E9D19AD18A8C.png)

If fail, a message will be displayed:
   ![endpoint test](src/assets/images/66031F61-E14A-4286-8039-3300B04D523F_4_5005_c.jpeg)

## Create Review API Test

This section describes how to test the **Create Review API** endpoint. This endpoint allows authenticated users to create a new review by providing details such as title, author/director, content, genre, rating, and an optional image file.

---

### **Endpoint**

`POST /reviews/create/`

---

### **Headers**

| Header          | Value                               | Required | Description                           |
|------------------|-------------------------------------|----------|---------------------------------------|
| `Authorization` | `Bearer <your-access-token>`        | Yes      | The JWT token obtained after login.   |
| `Content-Type`  | `multipart/form-data`               | Yes      | Specifies that the request contains file data. |

---

### **Request Parameters**

| Parameter         | Type       | Required | Description                              |
|-------------------|------------|----------|------------------------------------------|
| `title`           | String     | Yes      | The title of the review.                 |
| `author_director` | String     | Yes      | The author or director of the work.      |
| `content`         | String     | Yes      | The main content of the review.          |
| `genre`           | Integer    | Yes      | The ID of the genre for the review.      |
| `rating`          | Number     | Yes      | The rating for the work (0 to 5).        |
| `img`             | File       | No       | An optional image file related to the review. |

---

### **Request Example (cURL)**

```bash
curl -X POST https://books-and-films-api-e4ea62133d4f.herokuapp.com/reviews/create/ \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: multipart/form-data" \
  -F "title=My Favorite Movie" \
  -F "author_director=Christopher Nolan" \
  -F "content=This movie redefined the genre of science fiction." \
  -F "genre=1" \
  -F "rating=5" \
  -F "img=@/path/to/image.jpg"
 ```

 Replace <your-access-token> with a valid JWT access token and /path/to/image.jpg with the full path to an image file on your system.

  If successful, a message will be displayed:
   ![endpoint test](src/assets/images/95EDE3ED-5013-4FB1-AD81-CF533ED8680D.png)

  If fail, a message will be displayed:
   ![endpoint test](src/assets/images/AACAA536-0C99-4E42-B40B-FC19542E2AFB.png)


# UserProfile API Tests

This section outlines how to test the **UserProfile** API endpoints for retrieving, updating. The endpoints require authentication with a valid JWT token.

---

 ### 1. **User Profile**

**Endpoint**: `PUT /user/profile/`
  Request Example (cURL):

  ```bash
  curl -X PUT https://books-and-films-api-e4ea62133d4f.herokuapp.com/user/profile/ \
  -H "Authorization: Bearer <your-access-token>" \
  -H "Content-Type: multipart/form-data" \
  -F "username=newusername" \
  -F "email=newemail@example.com" \
  -F "first_name=New" \
  -F "last_name=Name" \
  -F "biography=Updated biography." \
  -F "profile_image=@/path/to/new-image.jpg"
  ```

 Replace <your-access-token> with a valid JWT token.
 Replace /path/to/new-image.jpg with the path to a valid image file.

 If successful, a message will be displayed:
   ![endpoint test](src/assets/images/615A6636-BCA7-4651-9C76-FB552C1786C7.png)

  If fail, a message will be displayed:
   ![endpoint test](src/assets/images/2730BDC8-0887-425D-B148-A095C8C1BE63.png)



## Testing

### Validator Testing

- **HTML Validation**  
  No major errors were found using the [W3C Validator](https://validator.w3.org).

  ![HTML Validator](src/assets/images/test_login.jpeg)
  ![HTML Validator](src/assets/images/test_register.jpeg)
  ![HTML Validator](src/assets/images/test_home.jpeg)
  ![HTML Validator](src/assets/images/test_create.jpeg)
  ![HTML Validator](src/assets/images/test_review_details.jpeg)
  ![HTML Validator](src/assets/images/test_edit_review.jpeg)
  ![HTML Validator](src/assets/images/test_profile.jpeg)
  ![HTML Validator](src/assets/images/test_edit_profile.jpeg)

- **CSS Validation**  
  Passed the [Jigsaw CSS Validator](https://jigsaw.w3.org/css-validator/).

  ![CSS Validator](src/assets/images/css_register.jpeg)
  ![CSS Validator](src/assets/images/css_login.jpeg)
  ![CSS Validator](src/assets/images/css_home.jpeg)
  ![CSS Validator](src/assets/images/css_reviews_create.jpeg)
  ![CSS Validator](src/assets/images/css_reviews_det.jpeg)
  ![CSS Validator](src/assets/images/css_reviews_edit.jpeg)
  ![CSS Validator](src/assets/images/css_profile.jpeg)
  ![CSS Validator](src/assets/images/css_edit_profile.jpeg)
  
 


---

### Check List

| **Functionality**              | **Expected Behavior**                                | **Result** |
|--------------------------------|-----------------------------------------------------|------------|
| **Page Load**                  | Loads with correct layout and content.              | Pass       |
| **Responsive Design**          | Adjusts properly on different screen sizes.         | Pass       |
| **Login Functionality**        | Redirects and displays error/success messages.      | Pass       |
| **Logout Functionality**       | Logs the user out and redirects to login page.      | Pass       |
| **Category Links**             | Displays filtered reviews by category.              | Pass       |
| **Genre Links**                | Displays filtered reviews by genre.                 | Pass       |
| **Review Creation**            | Allows users to create new reviews with validation. | Pass       |
| **Edit Review**                | Allows users to update existing reviews.            | Pass       |
| **Delete Review**              | Deletes user-created reviews after confirmation.    | Pass       |
| **Comments**                   | Users can add, edit, and delete comments.           | Pass       |
| **Password Reset**             | Handles password reset requests and updates.        | Pass       |
| **Favorites**                  | Displays and navigates to favorite profiles.        | Pass       |

---

### Lighthouse Tests

- Lighthouse tests were conducted to ensure performance, accessibility, and responsiveness.

  ![Lighthouse Test](src/assets/images/lighthouse.png)

---

## Issues: Determining a Default Image for User Profiles

### **Problem:**
Initially, we attempted to assign a default profile image for users who did not upload their own image. This approach presented several challenges:
1. **Static Default Image:** Using a static URL for the default image introduced maintenance issues.

---

### **Solution:**
To address these challenges, we added an image upload field directly to the registration form. This allows users to choose their profile image during account creation, resolving the issues as follows:
- **User Choice:** The addition of an image input field (`<input type="file">`) empowers users to upload their profile image during registration, enhancing the customization experience.


## Deployment

For correct operation, it is necessary to create two apps on Heroku, one for the frontend and one for the API.
The deployment process ensures that your Books and Films application is live and accessible to users. Below is a step-by-step guide with detailed explanations for deploying the application using Heroku:

1. **Clone the Repository**  
   Clone the project repositories to your local environment or GitHub account.

2. **Install Heroku CLI**  
   Download and install the Heroku CLI.
   After installation, log in using:

    `heroku login`, on your terminal.

   This opens a browser window for authentication.

3. **Create a Heroku App**  
   On your Heroku dashboard, click the `New` button in the right corner and then `Create new app`.
   On the next page, add a name for your app and select the region you want.
   On the next page, navigate to the `Deploy` section and in the `Deployment method` option select `Github`, connect to your Github repository.

   **Repeat this process to create the second app where the API will work**

4. **Add Necessary Add-ons**  
    **This step is only necessary for the API app**
    In the `Resources` tab on your Heroku app's dashboard, add the following `add ons` to the search field:

    - Heroku Postgres for the database.
    - Cloudinary for image storage.

5. **Configure Environment Variables**  

    **Frontend app**
    In the Heroku dasbord, go to the `settings` tab and in the `Config Var` section add the following variable: 
    - `REACT_APP_API_URL` with the value of the url of your Api app.

    It can be found in the dasbord of your API app in the `settings` tab in the `Domains` section.

    **API app**
    In the Heroku dasbord, go to the `settings` tab and in the `Config Var` section add the following variable:
    - `ALLOWED_HOSTS`: Your app's domain.
    - `DATABASE_URL`: URL for the Postgres database.
    - `CLOUDINARY_URL`: Your Cloudinary API key.
    - `DEBUG` : value of False.
    - `SECRET_KEY`: Django secret key.

6. **Perform Database Migrations**  
    On your environment access the Heroku terminal:

    `heroku run bash -a your api app name`
    Replace "your api app name" with the name of your API app

    Run `python manage.py migrate` in the Heroku terminal.

7. **Deploy the Application**  
   After this process, in the `Deploy` tab in the `Manual deploy` section, click on the `Deploy Branch` button to start the app.

8. **Access the Live Application**  
   The site will be live at the Heroku app URL.

---

## Content

- The textual content was sourced from:
  - [Common Sense Media](https://www.commonsensemedia.org)
  - [Rotten Tomatoes](https://www.rottentomatoes.com)

- Images were sourced from:
  - [Common Sense Media](https://www.commonsensemedia.org)
  - [Pexels](https://pexels.com)





