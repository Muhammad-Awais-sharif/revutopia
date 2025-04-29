import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import MultiStepForm from './pages/multi-step-form/multi-step-form.component';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-[35px] py-8">
        <MultiStepForm />
      </main>
      <Footer />
    </div>
  );
}
