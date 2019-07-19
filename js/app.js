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
  Button,
  Input,
  Icon,
  Link,
  CircularProgress
} = MaterialUI;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
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
      default: '#556cd6'
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    fontSize: '1.5rem',
    height: '500px',
    marginTop: '100px',
    display: 'flex',
    padding: '0'
  },
  container: {
    border: '1px solid red',
    fontSize: 'inherit',
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    textAlign: 'center'
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

const Header = props => {
  const classes = useStyles();

  return (
    <Box variant='h3' className={classes.header}>
      {props.text}
    </Box>
  );
};

const Editor = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header text='Editor' />
      <Input id='editor' type='textarea' multiline={true} />
    </Box>
  );
};

const Previewer = props => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Header text='Previewer' />
      <Box id='preview' variant='p'>
        {props.marked}
      </Box>
    </Box>
  );
};

// Footer
const Footer = () => {
  const classes = useStyles();

  return (
    <Box textAlign='center' color='white' margin={2}>
      <Typography>&copy; 2019 picklu</Typography>
    </Box>
  );
};

// Markdown Previewer
const MarkdownPreviewer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth='lg' className={classes.root}>
        <Editor />
        <Previewer />
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
