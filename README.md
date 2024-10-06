Feature Details and Explanations
1. Titles for Notes

    Implementation: An input field (<input type="text" id="noteTitle">) is added for the user to enter the note title.
    Usage: The title is used to identify and save notes, allowing users to differentiate between multiple notes.

2. Multiple Notes with List View

    Implementation: Notes are stored as objects in an array (notes), saved in localStorage. A list view displays all saved notes, and users can click to load them.
    Usage: Users can create multiple notes, view them in a list, and click on a note to load it into the editor.

3. Word Count

    Implementation: A function updateWordCount() calculates the number of words in the editor and updates the display.
    Usage: The word count updates in real-time as the user types.

4. Formatting Toolbar (Rich Text Editing)

    Implementation: A toolbar with buttons allows users to apply formatting using document.execCommand(). The editor uses a contenteditable div.
    Usage: Users can select text and click buttons to make text bold, italic, underline, or create lists.

5. Download as .txt File

    Implementation: The downloadNote() function creates a Blob from the note content and triggers a download.
    Usage: Users can download their notes as .txt files for offline access.

6. Dark Mode Toggle

    Implementation: A button toggles the dark-mode class on the body, changing the theme via CSS.
    Usage: Users can switch between light and dark themes for comfortable reading and writing.

7. Autosave Feature

    Implementation: An event listener on the editor saves the note content and updates word count and timestamp on input.
    Usage: Notes are automatically saved as the user types, preventing data loss.

8. Note Timestamps

    Implementation: Notes store a timestamp property indicating the last modified time. This is displayed in the status bar.
    Usage: Users can see when the note was last modified, helping them keep track of changes.
