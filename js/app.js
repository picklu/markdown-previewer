/***************************************
 *
 * Material-Ui styles
 *
 * *************************************/
const {
  colors,
  CssBaseline,
  MuiThemeProvider,
  Typography,
  Container,
  makeStyles,
  createMuiTheme,
  Box,
  Input,
  Icon,
  Link,
  CircularProgress
} = MaterialUI;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#779ce6'
    },
    secondary: {
      main: '#19857b'
    },
    tertiary: {
      main: 'ff2255'
    },
    error: {
      main: colors.red.A400
    },
    background: {
      default: '#ccc'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    fontSize: '1.5rem',
    height: '500px',
    marginTop: '100px',
    display: 'flex',
    padding: '0'
  },
  container: {
    color: 'white',
    fontSize: 'inherit',
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#444',
    padding: '10px',
    textAlign: 'center'
  },
  input: {
    height: '100%',
    padding: '15px',
    resize: 'none',
    overflowY: 'scroll',
    display: 'flex',
    alignItems: 'stretch'
  },
  preview: {
    color: 'black',
    height: '100%',
    padding: '15px',
    resize: 'none',
    overflowY: 'scroll'
  }
}));

/***************************************
 *
 * Javascript
 *
 * *************************************/

//  Concatenation of classes
const clsx = (...classes) => {
  return Array.from(classes).join(' ');
};

const defaultMarkdown = `
# Hello, World!
## Welcome to my Markdown Previewer!

### Markdown is awesome!!!
  
Here's is \`<div>Code between backticks</div>\`

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org/picklu), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![freeCodeCamp Logo w/ Text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5VpQQBPjQw4D1dbMCmzPpIoRMRwCD4KWVIXkeT333XGTs7TxlAA)
`;

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
  gfm: true
});

const { useState, useEffect } = React;

const Header = props => {
  const classes = useStyles();

  return (
    <Box color='tertiary' variant='h3' className={classes.header}>
      {props.text}
    </Box>
  );
};

const Editor = props => {
  const classes = useStyles();
  const [textInput, setTextInput] = useState(props.defaultValue);

  const handleInput = () => {
    props.handleInputText(textInput);
  };

  return (
    <Box className={classes.container}>
      <Header text='Editor' />
      <Input
        name='textInput'
        id='editor'
        multiline={true}
        className={classes.input}
        value={textInput}
        onChange={event => setTextInput(event.target.value)}
        ref={handleInput}
      />
    </Box>
  );
};

const Previewer = props => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header text='Previewer' />
      <Box
        id='preview'
        className={classes.preview}
        dangerouslySetInnerHTML={{ __html: props.markedText }}
      />
    </Box>
  );
};

// Footer
const Footer = () => {
  const classes = useStyles();

  return (
    <Box textAlign='center' margin={3}>
      <Typography>&copy; 2019 picklu</Typography>
    </Box>
  );
};

// Markdown Previewer
const MarkdownPreviewer = () => {
  const [text, setText] = useState(defaultMarkdown);
  const [markedText, setMarkedText] = useState(marked(text));
  const classes = useStyles();

  useEffect(() => {
    setMarkedText(marked(text));
  }, [text]);

  const handleInputText = inputText => {
    setText(inputText);
  };

  return (
    <React.Fragment>
      <Container maxWidth='lg' className={classes.root}>
        <Editor defaultValue={text} handleInputText={handleInputText} />
        <Previewer markedText={markedText} />
      </Container>
    </React.Fragment>
  );
};

// Main app
const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <MarkdownPreviewer />
      <Footer />
    </MuiThemeProvider>
  );
};

// Mouting app to the DOM
ReactDOM.render(<App />, document.getElementById('app'));
