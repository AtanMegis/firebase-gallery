import { Google } from '@mui/icons-material';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmailField from '../UI/EmailField';
import PasswordField from '../UI/PasswordField';
import SubmitButton from '../UI/SubmitButton';
import ResetPassword from './ResetPassword';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const [isRegister, setIsRegister] = useState(false);

	const {
		modal,
		setModal,
		signUp,
		login,
		loginWithGoogle,
		setAlert,
		setLoading,
	} = useAuth();

	useEffect(() => {
		if (isRegister) {
			setModal({ ...modal, title: 'Register' });
		} else {
			setModal({ ...modal, title: 'Login' });
		}
	}, [isRegister]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		if (isRegister) {
			const confirmPassword = confirmPasswordRef.current.value;
			try {
				if (password !== confirmPassword) {
					throw new Error(`Passwords don't Match`);
				}
				await signUp(email, password);
				setModal({ ...modal, isOpen: false });
			} catch (error) {
				setAlert({
					isAlert: true,
					severity: 'error',
					message: error.message,
					timeout: 5000,
					location: 'modal',
				});
				console.log(error);
			}
		} else {
			try {
				await login(email, password);
				setModal({ ...modal, isOpen: false });
			} catch (error) {
				setAlert({
					isAlert: true,
					severity: 'error',
					message: error.message,
					timeout: 5000,
					location: 'modal',
				});
				console.log(error);
			}
		}
		setLoading(false);
	};

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
			setModal({ ...modal, isOpen: false });
		} catch (error) {
			setAlert({
				isAlert: true,
				severity: 'error',
				message: error.message,
				timeout: 5000,
				location: 'modal',
			});
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<DialogContent dividers>
					<DialogContentText>
						Please enter your email and password
					</DialogContentText>
					<EmailField {...{ emailRef }} />
					<PasswordField
						{...{ passwordRef, autoFocus: false }}
					/>
					{isRegister && (
						<PasswordField
							{...{
								passwordRef: confirmPasswordRef,
								id: 'cu',
								label: 'Confirm Password',
								autoFocus: false,
							}}
						/>
					)}
				</DialogContent>
				<DialogActions
					sx={{ justifyContent: 'space-between', px: '19px' }}
				>
					<Button
						size="small"
						onClick={() =>
							setModal({
								...modal,
								title: 'Reset Password',
								content: <ResetPassword />,
							})
						}
					>
						Forgot Password?
					</Button>
					<SubmitButton />
				</DialogActions>
			</form>
			<DialogActions sx={{ justifyContent: 'center', p: '5px 24px' }}>
				{isRegister
					? 'Already have an account ? Sign in Now'
					: `don't have an account ? Create one now`}
				<Button
					onClick={() => {
						setIsRegister(!isRegister);
					}}
				>
					{isRegister ? 'Login' : 'Register'}
				</Button>
			</DialogActions>
			<DialogActions sx={{ justifyContent: 'center', py: '20px' }}>
				<Button
					variant="outlined"
					startIcon={<Google />}
					onClick={handleGoogleLogin}
				>
					Login with Google
				</Button>
			</DialogActions>
		</>
	);
};

export default Login;
