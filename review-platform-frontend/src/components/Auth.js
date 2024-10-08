import jwt_decode from 'jwt-decode';


export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            
            localStorage.removeItem('token');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        localStorage.removeItem('token');
        return false;
    }
};
