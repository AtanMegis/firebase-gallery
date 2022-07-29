import { Container } from '@mui/material';
import ImageList from './components/ImageList/ImageList';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/UI/Loading';
import MainNotification from './components/UI/MainNotification';
import Modal from './components/UI/Modal';
import Upload from './components/Upload/Upload';
import AuthContext from './context/AuthContext';

function App() {
	return (
		<div className="App">
			<Container
				maxWidth="lg"
				sx={{ textAlign: 'center', mt: '3rem' }}
			>
				<AuthContext>
					<Loading />
					<Modal />
					<MainNotification />
					<Navbar />
					<Upload />
					<ImageList />
				</AuthContext>
			</Container>
		</div>
	);
}

export default App;
