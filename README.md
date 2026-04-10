# 🎬 Movie Explorer Website

## Project Overview

In this project, your team will build a **Movie Explorer Website** where users can discover, search, and save their favorite movies.

The main purpose of this project is to practice core front-end web development skills, including:

- **HTML** for structuring web pages
- **CSS** for layout and styling
- **JavaScript** for interactivity and DOM manipulation
- **API usage** for fetching movie data
- **Event handling** for user interactions
- **Team collaboration** using GitHub branches and Pull Requests

---

## Minimum Requirements

Your project must include the following features:

### 1. Home Page
Create a homepage that displays a list of movies in **card format**.

Each movie card should include:
- Movie poster
- Movie title
- Rating or release year

### 2. Search Function
Users should be able to search for movies.

Requirements:
- Accept user input through a search field
- Display matching movie results dynamically

### 3. Movie Details
When a user clicks on a movie, show more detailed information, including:

- Movie title
- Poster
- Description
- Rating
- Release date

This can be implemented in either of the following ways:
- A modal
- A separate movie details page

### 4. Favorites Feature
Users should be able to save movies to their favorites.

Requirements:
- Add movies to favorites
- Store favorite movies using `localStorage`
- Create a Favorites section or separate Favorites page

### 5. Responsive Design
The website must work properly on:
- Desktop
- Tablet
- Mobile

Use **Flexbox** or **CSS Grid** to create a responsive layout.

---

## Technologies to Use

Your project must be built using:

- HTML
- CSS
- JavaScript

You may use:
- **The Movie Database (TMDB) API** to fetch movie data
- or a **local JSON file** if preferred

---

## Suggested Project Structure

```text
movie-explorer/
│
├── index.html
├── favorites.html
├── css/
│   ├── main.css
│   ├── home.css
│   ├── details.css
│   ├── favorites.css
│   └── responsive.css
│
├── js/
│   ├── api.js
│   ├── render.js
│   ├── search.js
│   ├── details.js
│   ├── favorites.js
│   └── main.js
│
└── assets/
```

---

## Team Task Division

### Student 1: Project Setup

**Responsibility:**  
Create the base project skeleton.

**Tasks**
- Create the initial HTML pages and files
- Set up the folder structure:
  - `index.html`
  - `favorites.html`
  - `css/`
  - `js/`
  - `assets/`
- Add shared navbar, header, and footer
- Link CSS and JavaScript files correctly
- Create a common movie card container section
- Define the basic file naming convention and coding style

**Deliverable**  
A working starter project structure that everyone can build on.

---

### @Binigech46: Home Page UI

**Responsibility:**  
Build the visual layout of the main page.

**Tasks**
- Design the homepage layout
- Style the movie cards
- Make sections look clean and readable
- Add spacing, typography, buttons, and general page styling
- Ensure the homepage looks good before functionality is added

**Deliverable**  
A fully styled homepage UI without requiring the API logic yet.

---

### @Yesilase_lij: Movie Data Fetching + Rendering

**Responsibility:**  
Fetch movie data and display it on the page.

**Tasks**
- Fetch movies from the TMDB API or a local JSON file
- Write JavaScript to render movie cards dynamically
- Display:
  - poster
  - title
  - rating or release year
- Handle missing poster or image cases

**Deliverable**  
Movies appear dynamically on the homepage.

---

### @HT09004: Search Feature

**Responsibility:**  
Implement movie search functionality.

**Tasks**
- Build the search bar functionality
- Capture user input
- Filter or fetch matching movies
- Update results dynamically without reloading the page
- Show a "No results found" message when needed

**Deliverable**  
Search works smoothly and updates the movie list dynamically.

---

### @Adameth_25: Movie Details Feature

**Responsibility:**  
Show detailed information when a movie is clicked.

**Tasks**
- Create a movie details modal or a separate details page
- Show:
  - title
  - poster
  - description
  - rating
  - release date
- Connect movie card clicks to the details display
- Add a close button if using a modal

**Deliverable**  
Clicking a movie shows full movie information.

---

### @GRayoot: Favorites Feature

**Responsibility:**  
Allow users to save and manage favorite movies.

**Tasks**
- Add an "Add to Favorites" button
- Save favorite movies using `localStorage`
- Build the Favorites page or section
- Display saved movies there
- Add a remove-from-favorites option
- Prevent duplicate favorites if possible

**Deliverable**  
Users can save and manage favorite movies.

---

### @miapricity: Integration + Responsive Design + Testing

**Responsibility:**  
Make sure all project parts work together.

**Tasks**
- Pull all branches and tasks together
- Fix conflicts between HTML, CSS, and JavaScript files
- Make sure all components connect properly
- Test navigation, search, details, favorites, and API flow
- Make the site responsive for:
  - desktop
  - tablet
  - mobile
- Fix layout bugs and integration issues

**Deliverable**  
A final polished project where all features work together.

---

## Suggested Branch Names

Each student must create and work on their own branch.

```bash
feature/project-setup
feature/home-ui
feature/movie-fetch-render
feature/search
feature/movie-details
feature/favorites
feature/integration-responsive
```

---

## Suggested Branch Assignment

| Student | Task | Branch |
|---------|------|--------|
| Student 1 | Project Setup | `feature/project-setup` |
| @Binigech46 | Home Page UI | `feature/home-ui` |
| @Yesilase_lij | Movie Data Fetching + Rendering | `feature/movie-fetch-render` |
| @HT09004 | Search Feature | `feature/search` |
| @Adameth_25 | Movie Details Feature | `feature/movie-details` |
| @GRayoot | Favorites Feature | `feature/favorites` |
| @miapricity | Integration + Responsive Design + Testing | `feature/integration-responsive` |

---

## GitHub Workflow

This project will be managed using **GitHub branches** and **Pull Requests**.

### Student Workflow

1. Clone the repository
2. Create your assigned branch
3. Work only on your assigned task
4. Commit your changes with clear commit messages
5. Push your branch to GitHub
6. Open a Pull Request to the `main` branch
7. Wait for review before any merge happens

Example:

```bash
git clone <repo-url>
cd movie-explorer
git checkout -b feature/search
```

After making changes:

```bash
git add .
git commit -m "Add movie search functionality"
git push origin feature/search
```

Then open a Pull Request on GitHub.

---

## Pull Request and Merge Rules

To keep the project organized and easy to review, all students must follow these rules.

### Branch Rules
- Do not push directly to the `main` branch.
- Each student must work only on their assigned branch.
- Use the suggested branch names unless told otherwise.

### Commit Rules
- Write clear and meaningful commit messages.
- Keep commits related to your assigned task only.

Examples:
- `Create homepage layout`
- `Style movie cards`
- `Add search functionality`
- `Implement favorites with localStorage`

### Pull Request Rules
- Open a Pull Request only after completing a clear part of your assigned task.
- Each Pull Request should focus on one task or feature only.
- Add a short description in the Pull Request explaining:
  - what was implemented
  - which files were changed
  - anything the reviewer should test

### Before Opening a Pull Request
Make sure that:
- your code runs correctly
- there are no unnecessary files
- file names are clear and consistent
- your changes do not break existing features
- the code is clean and readable

### Review Rules
- All Pull Requests will be reviewed by the mentor before merging.
- Changes may be requested before approval.
- A Pull Request will only be merged after:
  - the feature works correctly
  - the code is readable and organized
  - there are no major conflicts with the rest of the project

### Merge Rules
- Only the mentor will merge Pull Requests into `main`.
- Students must not merge their own Pull Requests.
- If there is a conflict, the student may be asked to update their branch before merging.

### Team Collaboration Rules
- Stay within your assigned task as much as possible.
- Communicate early if your work depends on someone else's part.
- Pull the latest changes regularly if needed.
- Keep your PR small and focused instead of submitting too many unrelated changes at once.

---

## Review Criteria

Pull Requests will be reviewed based on the following:

- Correctness
- Code readability
- File organization
- Consistent naming
- Feature completeness
- Responsiveness where relevant
- Compatibility with the rest of the project

---

## Final Goal

By completing this project, the team should be able to build a complete, interactive, and responsive movie website while also practicing real GitHub collaboration through branches, Pull Requests, code review, and merging.


