import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiAvatar: {
      img: {
        color: "transparent",
        width: "50px !important",
        objectFit: "cover",
        textAlign: "center",
        textIndent: "10000px",
        height: "auto",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "0px 30px 0px 30px",
      },
    },
    MuiInput: {
      underline: {
        "&::after": {
          display: "none",
        },
        "&::before": {
          left: "0",
          right: "0",
          bottom: "0",
          content: '"\\00a0"',
          position: "absolute",
          transition:
            "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          borderBottom: "1px solid #fff",
          pointerEvents: "none",
        },
      },
    },
    MuiSelect: {
      icon: {
        color: " rgb(254 254 255)",
      },
    },
    MuiTab: {
      root: {
        padding: "6px 12px",
        overflow: "hidden",
        position: "relative",
        fontSize: "0.875rem",
        maxWidth: "148 !important",
        minWidth: "117px !important",
        boxSizing: "border-box",
        color: "#fff !important",
        minHeight: "48px",
        textAlign: "left",

        fontWeight: "500",
        lineHeight: "1.75",
        whiteSpace: "normal",
        borderRadius: "0px",
      },
      textColorInherit: {
        opacity: "1",
      },
    },
    MuiMenuItem: {
      root: {
        width: "auto",
        fontSize: "15px",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "400",
        overflow: "hidden",
        boxSizing: "border-box",
        minHeight: "48px",
        lineHeight: "1.5",
        paddingTop: "6px",
        whiteSpace: "nowrap",
        paddingBottom: "6px",
      },
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: "#EA1546",
      },
    },
    MuiToolbar: {
      regular: {
        minHeight: "0px !important",
        "@media (max-width: 1024px)": {
          minHeight: "70px !important",
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
        backgroundColor: "#190a2c",
      },
      outlined: {
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderTopLeftRadius: "48px",
        borderTopRightRadius: "48px",
      },
    },
    MuiDivider: {
      root: {
        height: "0px",
      },
    },
    MuiSlider: {
      root: {
        color: " #ffffff",
        height: "10px",
      },

      track: {
        height: "10px",
        borderRadius: "50px!important",
        backgroundColor: "#e21ae7 !important",
      },
      rail: {
        height: "10px",
        borderRadius: "50px!important",
        backgroundColor: "#e21ae7 !important",
        backgroundColor: "#fff",
        opacity: 1,
      },
      thumb: {
        width: "20px",
        height: "20px",
        "&.Mui-disabled": {
          width: "18px",
          height: "18px",
        },
      },
      valueLabel: {
        left: "calc(-50% - -3px)",
      },
      mark: {
        display: "none",
      },
    },
    MuiTableCell: {
      alignCenter: {
        textAlign: "left !important",
      },
      // body: {
      //   color: "#a09797 !important",
      // },
    },

    MuiTableCell: {
      root: {
        borderBottom: "none",
      },
      head: {
        color: "#fff",
        borderBottom: "none",
      },

      body: {
        color: "#fff !important",
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: "0 !important",
        width: "100%",
      },
      root: {
        padding: 0,
      },
    },
    // MuiAccordionSummary: {
    //   root: {
    //     backgroundColor: "#190A2C",
    //     padding: "0px 0px",
    //     "@media (max-width:991px)":{
    //       padding:" 15px 0",
    //     },
    //   },
    //   content: {
    //     margin: "0px 0",
    //   },
    // },
    // MuiAccordionDetails: {
    //   root: {
    //     backgroundColor: "#190A2C",
    //     padding: "-1px 16px 16px",
    //   },
    // },
    PrivateValueLabel: {
      label: {
        color: " #000",
      },
    },
    MuiDialogContent: {
      root: {
        padding: 0,
        "&:first-child": {
          paddingTop: 0,
        },
      },
    },
    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiFormControl: {
      root: {
        borderRadius: "24px",
      },
    },
    MuiList: {
      padding: {
        padding: "10px",
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiListItem: {
      gutters: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },

    MuiOutlinedInput: {
      input: {
        padding: "10px 10px",
      },
      root: {
        position: " relative",
        // borderRadius: '50px',
        padding: "0px 24px 0px 3px",
      },
      notchedOutline: {
        borderColor: "rgb(93 86 101) !important",
        "&::placeholder": {
          color: "#fff",
        },
      },
      colorSecondary: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color: "#fff",
          borderColor: "#222",
        },
        "&.Mui-focused": {
          color: "#ffff",
        },
      },
    },

    MuiCheckbox: {
      root: {
        padding: "4px",
        fontSize: "12px",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "" },
      },
    },
    MuiInputAdornment: {
      positionStart: {
        color: "#fff",
        marginRight: "-11px",
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#EA1546",
        color: "#fff",
        fontSize: "14px",
        height: "40px",
        textTransform: "uppercase",
        borderRadius: "5px",
        letterSpacing: "1.5px",
        fontWeight: "500",
        padding: "12px 35px",
        "@media (max-width: 767px)": {
          fontSize: "13px !important",
          height: "40px",
        },
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        },
      },

      outlinedPrimary: {
        borderRadius: "50px",
        color: "#fff",
        fontWeight: 600,
        padding: "5px 19px",
        border: "2px solid #f83838",
        "&:hover": {
          backgroundColor: "#f83838",
          border: "2px solid #f83838",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
      root: {
        zIndex: "9 !important",
        position: "fixed",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
      list: {
        color: "#fff",
      },
    },
    MuiInputBase: {
      input: {
        padding: "9px !important",

        color: "#ffffff",
        fontSize: "15px",

        fontWeight: "400",

        //color: '#ffffff',
      },
      root: {
        borderRadius: "0px !important",
        height: "45px",
        color: "#b3b3b4",
      },
    },
    MuiIconButton: {
      root: {
        color: "#fb4b4b",
        "&:hover": {
          backgroundColor: "transparent",
          borderRadius: "0px",
        },
      },
    },
    MuiAppBar: {
      zIndex: "9",
      colorPrimary: {
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "transparent",
        zIndex: "9",
      },
    },

    MuiTypography: {
      subtitle1: {
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary: {
          color: "#8d8989",
        },
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Dismedia', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#fff",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ff7d68",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#52565c",
      secondary: "#999999",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
