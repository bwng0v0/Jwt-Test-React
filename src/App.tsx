import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { BulletinPage } from "./pages/BulletinPage";
import CreateBulletinPage from "./pages/CreateBulletinPage";

export function App() {
  return (
    <Router>
      <main className="min-h-screen w-full flex items-center justify-center bg-black ">
        <Routes>
          <Route path="/" element={<BulletinPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/create" element={<CreateBulletinPage/>} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
