import {SheetsRegistry} from 'jss';
import {createMuiTheme, createGenerateClassName} from '@material-ui/core/styles';
import {grey, green, red, yellow} from '@material-ui/core/colors';

const theme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true,
        }
    },
    palette: {
        success: {
            backgroundColor: green[400],
            color: grey[50]
        },
        warn: {
            backgroundColor: yellow[600],
            color: grey[50]
        },
        danger: {
            backgroundColor: red[500],
            color: grey[50]
        },
        midNight: {
            backgroundColor: grey[900],
            color: grey[50]
        },
        dayLight: {
            backgroundColor: grey[50],
            color: grey[900]
        },
        transparentDark: {
            backgroundColor: 'transparent',
            color: grey[50]
        },
        transparentLight: {
            backgroundColor: 'transparent',
            color: grey[900]
        },
    },
    decorativeFont: {
        fontFamily: 'Anton'
    },
    typography: {
        useNextVariants: true,
    }
});

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    };
}

let pageContext;

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!pageContext) {
        pageContext = createPageContext();
    }

    return pageContext;
}
