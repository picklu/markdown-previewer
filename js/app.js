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

![freeCodeCamp Logo w/ Text](data:image/png;base64,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)
`;

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
