export const options = {
  placeholderText: 'Edit Your Content Here!',
  charCounterCount: false,
  toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  toolbarButtons: {
    'moreText': {
      'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
    },
    'moreParagraph': {
      'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
    },
    'moreRich': {
      'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
    },
    'moreMisc': {
      'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
      'align': 'right',
      'buttonsVisible': 2
    }
  },
  codeBeautifierOptions: {
    end_with_newline: true,
    indent_inner_html: true,
    extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
    brace_style: 'expand',
    indent_char: ' ',
    indent_size: 4,
    wrap_line_length: 0
  },
  colorsBackground: ['#61BD6D', '#1ABC9C', '#54ACD2', 'REMOVE'],
  embedlyInsertButtons: ['embedlyBack', '|']
};
