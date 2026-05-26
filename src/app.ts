import express from 'express';
import productRoutes from './routes/product.routes';

const app = express();
const PORT = 3000;

// Middleware global para entender JSON
app.use(express.json());

// Enrutar las peticiones de productos
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});