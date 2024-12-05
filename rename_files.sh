# סקריפט לשינוי שמות הקבצים.

# שינוי שמות קבצים בלבד בתוך src/components
find src/components -type f | while read file; do
    dir=$(dirname "$file") # תיקייה
    base=$(basename "$file") # שם קובץ
    new_base=$(echo "$base" | awk '{print toupper(substr($0,1,1)) substr($0,2)}') # שינוי האות הראשונה לאות גדולה
    if [ "$base" != "$new_base" ]; then
        echo "Renaming: $file -> $dir/$new_base"
        git mv "$file" "$dir/$new_base"
    fi
done

echo "Finished renaming files in 'src/components'."

