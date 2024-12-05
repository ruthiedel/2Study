# סקריפט לשינוי שמות הקבצים.

# שינוי שמות קבצים בלבד בתוך src/components
# find src/components -type f | while read file; do
#     dir=$(dirname "$file") # תיקייה
#     base=$(basename "$file") # שם קובץ
#     new_base=$(echo "$base" | awk '{print toupper(substr($0,1,1)) substr($0,2)}') # שינוי האות הראשונה לאות גדולה
#     if [ "$base" != "$new_base" ]; then
#         echo "Renaming: $file -> $dir/$new_base"
#         git mv "$file" "$dir/$new_base"
#     fi
# done

# echo "Finished renaming files in 'src/components'."


#!/bin/bash
#!/bin/bash

#!/bin/bash

#!/bin/bash

# Rename directories (capitalizing folder names inside 'src')
mv src/components/book src/components/Book
mv src/components/bookCard src/components/BookCard
mv src/components/filterComponent src/components/FilterComponent
mv src/components/footer src/components/Footer
mv src/components/header src/components/Header
mv src/components/homepage src/components/Homepage
mv src/components/loading src/components/Loading
mv src/components/questionCard src/components/QuestionCard
mv src/components/rating src/components/Rating
mv src/components/styleComponents src/components/StyleComponents
mv src/components/userStatus src/components/UserStatus

# Rename files inside each directory (no changes in file names, only folder names)
mv src/components/Book/book.module.css src/components/Book/book.module.css
mv src/components/Book/book.tsx src/components/Book/book.tsx
mv src/components/BookCard/bookCard.module.css src/components/BookCard/bookCard.module.css
mv src/components/BookCard/bookCard.tsx src/components/BookCard/bookCard.tsx
mv src/components/FilterComponent/FilterComponent.module.css src/components/FilterComponent/FilterComponent.module.css
mv src/components/FilterComponent/FilterComponent.tsx src/components/FilterComponent/FilterComponent.tsx
mv src/components/Footer/ContactForm.module.css src/components/Footer/ContactForm.module.css
mv src/components/Footer/footer.tsx src/components/Footer/footer.tsx
mv src/components/Header/Header.tsx src/components/Header/Header.tsx
mv src/components/Header/header.module.css src/components/Header/header.module.css
mv src/components/Homepage/homepage.tsx src/components/Homepage/homepage.tsx
mv src/components/index.ts src/components/index.ts
mv src/components/Loading/loadingSpiner.tsx src/components/Loading/loadingSpiner.tsx
mv src/components/QuestionCard/questionCard.module.css src/components/QuestionCard/questionCard.module.css
mv src/components/QuestionCard/questionCard.tsx src/components/QuestionCard/questionCard.tsx
mv src/components/Rating/rating.module.css src/components/Rating/rating.module.css
mv src/components/Rating/rating.tsx src/components/Rating/rating.tsx
mv src/components/StyleComponents/StyledLink.ts src/components/StyleComponents/StyledLink.ts
mv src/components/UserStatus/Recommendations.tsx src/components/UserStatus/Recommendations.tsx
mv src/components/UserStatus/information.tsx src/components/UserStatus/information.tsx
mv src/components/UserStatus/progressCard.tsx src/components/UserStatus/progressCard.tsx
mv src/components/UserStatus/studyCard.tsx src/components/UserStatus/studyCard.tsx
mv src/components/UserStatus/userContainer.tsx src/components/UserStatus/userContainer.tsx
mv src/components/UserStatus/userStatus.module.css src/components/UserStatus/userStatus.module.css



