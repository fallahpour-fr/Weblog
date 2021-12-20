// import React, { Children, useState } from "react";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export const SnackbarContext = React.createContext();

// export default function SnackbarRender() {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     severity: "",
//     message: "",
//   });

//   const setStateSnackbarContext = (open, message, severity) =>
//     setStateSnackbar({ ...stateSnackbar, open, message, severity });

//   const { open, severty, message } = snackbar;
//   const handleClose = () => setSnackbar({ ...snackbar, open: false });

//   return (
//     <SnackbarContext.Provider value={setStateSnackbarContext}>
//       <div className={classes.root}>
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={open}
//           autoHideDuration={6000}
//           onClose={handleClose}
//         >
//           <Alert onClose={handleClose} severity={severity}>
//             {message}
//           </Alert>
//         </Snackbar>
//       </div>
//       {children}
//     </SnackbarContext.Provider>
//   );
// }

import React,{createContext} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

export const SnackbarContext = createContext();

export default function CustomizedSnackbars({ children }) {
	const classes = useStyles();

	const [stateSnackbar, setStateSnackbar] = React.useState({
		open: false,
		severity: "",
		message: "",
	});

	const setStateSnackbarContext = (open, message, severity) =>
		setStateSnackbar({ ...stateSnackbar, open, message, severity });

	const handleClose = () => setStateSnackbar({ ...stateSnackbar, open: false });

	const { open, severity, message } = stateSnackbar;

	return (
		<SnackbarContext.Provider value={setStateSnackbarContext}>
			<div className={classes.root}>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity={severity}>
						{message}
					</Alert>
				</Snackbar>
			</div>
			{children}
		</SnackbarContext.Provider>
	);
}