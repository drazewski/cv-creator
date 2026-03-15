import EditorPage from './components/EditorPage';
import './App.css';

export default function App() {
  return <EditorPage onNavigate={(path) => window.location.assign(path)} />;
}
