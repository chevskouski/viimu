<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'doe@example.com',
            'password' => Hash::make('o2spr!c9'),
        ]);

        $categories = [
            ['name' => 'Limpieza', 'description' => 'Servicios de limpieza para el hogar y oficina.', 'status' => true],
            ['name' => 'Reparaciones', 'description' => 'Servicios de reparación para el hogar.', 'status' => true],
            ['name' => 'Salud y Belleza', 'description' => 'Servicios de bienestar personal.', 'status' => true],
            ['name' => 'Tecnología', 'description' => 'Servicios de soporte técnico y desarrollo.', 'status' => true],
            ['name' => 'Educación', 'description' => 'Clases y tutorías en diversas áreas.', 'status' => true]
        ];

        DB::table('service_categories')->insert($categories);

        // Obtener las categorías recién insertadas
        $categoryIds = DB::table('service_categories')->pluck('id');

        // Crear servicios asociados a las categorías
        $services = [
            ['name' => 'Limpieza profunda', 'description' => 'Limpieza exhaustiva del hogar.', 'price' => 50.00, 'status' => true, 'service_category_id' => $categoryIds[0]],
            ['name' => 'Fontanería', 'description' => 'Reparaciones de tuberías y grifos.', 'price' => 75.00, 'status' => true, 'service_category_id' => $categoryIds[1]],
            ['name' => 'Masajes terapéuticos', 'description' => 'Relájate con un buen masaje.', 'price' => 40.00, 'status' => true, 'service_category_id' => $categoryIds[2]],
            ['name' => 'Desarrollo web', 'description' => 'Creación de sitios web a medida.', 'price' => 300.00, 'status' => true, 'service_category_id' => $categoryIds[3]],
            ['name' => 'Clases de matemáticas', 'description' => 'Tutorías para estudiantes.', 'price' => 25.00, 'status' => true, 'service_category_id' => $categoryIds[4]],
            ['name' => 'Limpieza de oficinas', 'description' => 'Mantenimiento de espacios laborales.', 'price' => 60.00, 'status' => true, 'service_category_id' => $categoryIds[0]],
            ['name' => 'Electricidad', 'description' => 'Instalaciones y reparaciones eléctricas.', 'price' => 85.00, 'status' => true, 'service_category_id' => $categoryIds[1]],
            ['name' => 'Corte de cabello', 'description' => 'Estilos modernos y clásicos.', 'price' => 20.00, 'status' => true, 'service_category_id' => $categoryIds[2]],
            ['name' => 'Soporte técnico', 'description' => 'Asistencia en software y hardware.', 'price' => 50.00, 'status' => true, 'service_category_id' => $categoryIds[3]],
            ['name' => 'Clases de inglés', 'description' => 'Aprende un nuevo idioma.', 'price' => 30.00, 'status' => true, 'service_category_id' => $categoryIds[4]]
        ];

        DB::table('services')->insert($services);

    }
}
