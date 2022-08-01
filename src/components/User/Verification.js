import { Close } from '@mui/icons-material';
import { useState } from 'react';
import { Alert, Box, Button, Collapse, IconButton } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import React from 'react';
import { sendEmailVerification } from 'firebase/auth';

const Verification = () => {
	const { currentUser, setAlert, setLoading } = useAuth();
	const [open, setOpen] = useState(true);
	const [isClicked, setIsClicked] = useState(false);

	const verify = async () => {
		setIsClicked(true);
		setLoading(true);

		try {
			await sendEmailVerification(currentUser);
			setAlert({
				isAlert: true,
				severity: 'info',
				message: 'verification link has been sent to your email inbox',
				timeout: 8000,
				location: 'main',
			});
		} catch (error) {
			setAlert({
				isAlert: true,
				severity: 'error',
				message: error.message,
				timeout: 8000,
				location: 'main',
			});
			console.log(error);
		}

		setLoading(false);
	};
	return (
		currentUser?.emailVerified === false && (
			<Box>
				<Collapse in={open}>
					<Alert
						severity="warning"
						action={
							<IconButton
								aria-label="Close"
								size="small"
								onClick={() => setOpen(false)}
							>
								<Close fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 3 }}
					>
						Your email has not been verified yet!
						<Button
							size="small"
							onClick={verify}
							disabled={isClicked}
							sx={{ lineHeight: 'initial' }}
						>
							verify Now
						</Button>
					</Alert>
				</Collapse>
			</Box>
		)
	);
};

export default Verification;
