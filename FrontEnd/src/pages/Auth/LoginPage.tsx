import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import loginPhoto  from "../../assets/Pote de dinheiro 3D da planta com flor de moeda de ouro e pilha de moedas no fundo roxo_ Renderização de ilustração 3D. _ Foto Premium. _ Foto Premium.png"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const { login, loading, error, clearAuthError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      clearAuthError();
    }
  }, [formData, clearAuthError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const result = await login(formData);
    if (!result.success) {
      console.error('Erreur de connexion:', result.error);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Welcome back</h1>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div  className='mb-4'>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 block w-full px-4 py-3 border ${validationErrors.email ? 'border-red-500' : 'border-gray-200'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-300 focus:border-primary sm:text-sm`}
              />
              {validationErrors.email && <p className="mt-2 text-sm text-red-600">{validationErrors.email}</p>}
            </div>

            <div  className='mb-4'>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`mt-1 block w-full px-4 py-3 border ${validationErrors.password ? 'border-red-500' : 'border-gray-200'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-primary sm:text-sm`}
              />
              {validationErrors.password && <p className="mt-2 text-sm text-red-600">{validationErrors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember for 90 Days
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                  Forgot password
                </a>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex  justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-black bg-primary hover:bg-primar-hover focus:outline-none focus:ring-2  cursor-pointer focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            <div>
              <button
                type="button"
                className="w-full cursor-pointer  flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <img className="h-5 w-5 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" />
                Sign in with Google
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-gray-800 underline hover:text-black">
                Sign up for free
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:flex w-1/2 bg-gray-100 justify-center items-center overflow-hidden">
        <img 
          src={loginPhoto} 
          alt="Login illustration"  
          className="h-screen w-full object-cover" 
        />
      </div>

    </div>
  );
};

export default LoginPage;
