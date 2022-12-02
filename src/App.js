import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Home from "./components/Home";

const theme = createTheme();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Home />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
