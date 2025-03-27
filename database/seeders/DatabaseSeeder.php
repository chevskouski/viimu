<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

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

        $inventories = [
            [
                'name' => 'Papel Bond Carta',
                'description' => 'Papel bond blanco para impresión láser y de inyección',
                'category' => 'Papelería',
                'unit' => 'Resma',
                'sku' => 'PAP-BOND-CARTA',
                'stock' => 500,
                'last_restock_date' => Carbon::now()->subDays(15)
            ],
            [
                'name' => 'Tóner HP LaserJet Negro',
                'description' => 'Tóner original para impresoras HP LaserJet',
                'category' => 'Consumibles Impresión',
                'unit' => 'Cartucho',
                'sku' => 'TON-HP-83A',
                'stock' => 50,
                'last_restock_date' => Carbon::now()->subDays(30)
            ],
            [
                'name' => 'Bolígrafo Punto Fino Negro',
                'description' => 'Bolígrafo marca BIC color negro',
                'category' => 'Material Oficina',
                'unit' => 'Unidad',
                'sku' => 'BOL-NEGRO-FINO',
                'stock' => 200,
                'last_restock_date' => Carbon::now()->subDays(20)
            ],
            [
                'name' => 'Carpeta Archivadora',
                'description' => 'Carpeta de cartón para archivo de documentos',
                'category' => 'Papelería',
                'unit' => 'Unidad',
                'sku' => 'CARP-ARCH-COLOR',
                'stock' => 100,
                'last_restock_date' => Carbon::now()->subDays(25)
            ],
            [
                'name' => 'Memoria USB 64GB',
                'description' => 'Memoria USB marca Kingston, color negro',
                'category' => 'Electrónica',
                'unit' => 'Unidad',
                'sku' => 'USB-64GB-KING',
                'stock' => 30,
                'last_restock_date' => Carbon::now()->subDays(45)
            ],
            [
                'name' => 'Cuaderno Argollado',
                'description' => 'Cuaderno universitario de 100 hojas',
                'category' => 'Papelería',
                'unit' => 'Unidad',
                'sku' => 'CUAD-100H-UNIV',
                'stock' => 80,
                'last_restock_date' => Carbon::now()->subDays(10)
            ],
            [
                'name' => 'Marcador Permanente Negro',
                'description' => 'Marcador permanente punta gruesa',
                'category' => 'Material Oficina',
                'unit' => 'Unidad',
                'sku' => 'MARC-PERM-NEGRO',
                'stock' => 75,
                'last_restock_date' => Carbon::now()->subDays(35)
            ],
            [
                'name' => 'Cable HDMI 1.8m',
                'description' => 'Cable HDMI de alta velocidad',
                'category' => 'Electrónica',
                'unit' => 'Unidad',
                'sku' => 'HDMI-1.8M-STD',
                'stock' => 40,
                'last_restock_date' => Carbon::now()->subDays(50)
            ],
            [
                'name' => 'Resaltador Amarillo',
                'description' => 'Marcador resaltador color amarillo',
                'category' => 'Material Oficina',
                'unit' => 'Unidad',
                'sku' => 'RESALT-AMAR',
                'stock' => 120,
                'last_restock_date' => Carbon::now()->subDays(5)
            ],
            [
                'name' => 'Engrapadora Metálica',
                'description' => 'Engrapadora de metal para oficina',
                'category' => 'Material Oficina',
                'unit' => 'Unidad',
                'sku' => 'ENGRAP-MET-STD',
                'stock' => 25,
                'last_restock_date' => Carbon::now()->subDays(40)
            ]
        ];

        DB::table('inventories')->insert($inventories);

        // Seeders para la tabla inventory_movements
        $movements = [
            // Movimientos para Papel Bond Carta (ID 1)
            [
                'inventory_id' => 1,
                'movement_date' => Carbon::now()->subDays(15),
                'type' => 'in',
                'quantity' => 500,
                'description' => 'Entrada de resmas por reposición de stock'
            ],
            [
                'inventory_id' => 1,
                'movement_date' => Carbon::now()->subDays(7),
                'type' => 'out',
                'quantity' => 50,
                'description' => 'Salida para departamento de administración'
            ],
            // Movimientos para Tóner HP LaserJet Negro (ID 2)
            [
                'inventory_id' => 2,
                'movement_date' => Carbon::now()->subDays(30),
                'type' => 'in',
                'quantity' => 50,
                'description' => 'Entrada de cartuchos de tóner nuevo'
            ],
            [
                'inventory_id' => 2,
                'movement_date' => Carbon::now()->subDays(15),
                'type' => 'out',
                'quantity' => 10,
                'description' => 'Salida para impresoras de oficina'
            ],
            // Movimientos para Bolígrafo Punto Fino Negro (ID 3)
            [
                'inventory_id' => 3,
                'movement_date' => Carbon::now()->subDays(20),
                'type' => 'in',
                'quantity' => 200,
                'description' => 'Entrada de bolígrafos nuevos'
            ],
            [
                'inventory_id' => 3,
                'movement_date' => Carbon::now()->subDays(10),
                'type' => 'out',
                'quantity' => 50,
                'description' => 'Salida para área de recursos humanos'
            ],
            // Movimientos para Carpeta Archivadora (ID 4)
            [
                'inventory_id' => 4,
                'movement_date' => Carbon::now()->subDays(25),
                'type' => 'in',
                'quantity' => 100,
                'description' => 'Entrada de carpetas nuevas'
            ],
            [
                'inventory_id' => 4,
                'movement_date' => Carbon::now()->subDays(12),
                'type' => 'out',
                'quantity' => 30,
                'description' => 'Salida para archivo contable'
            ],
            // Movimientos para Memoria USB 64GB (ID 5)
            [
                'inventory_id' => 5,
                'movement_date' => Carbon::now()->subDays(45),
                'type' => 'in',
                'quantity' => 30,
                'description' => 'Entrada de memorias USB nuevas'
            ],
            [
                'inventory_id' => 5,
                'movement_date' => Carbon::now()->subDays(20),
                'type' => 'out',
                'quantity' => 10,
                'description' => 'Salida para área de sistemas'
            ],
            // Movimientos para Cuaderno Argollado (ID 6)
            [
                'inventory_id' => 6,
                'movement_date' => Carbon::now()->subDays(10),
                'type' => 'in',
                'quantity' => 80,
                'description' => 'Entrada de cuadernos nuevos'
            ],
            [
                'inventory_id' => 6,
                'movement_date' => Carbon::now()->subDays(5),
                'type' => 'out',
                'quantity' => 20,
                'description' => 'Salida para capacitación'
            ],
            // Movimientos para Marcador Permanente Negro (ID 7)
            [
                'inventory_id' => 7,
                'movement_date' => Carbon::now()->subDays(35),
                'type' => 'in',
                'quantity' => 75,
                'description' => 'Entrada de marcadores nuevos'
            ],
            [
                'inventory_id' => 7,
                'movement_date' => Carbon::now()->subDays(15),
                'type' => 'out',
                'quantity' => 25,
                'description' => 'Salida para área de diseño'
            ],
            // Movimientos para Cable HDMI 1.8m (ID 8)
            [
                'inventory_id' => 8,
                'movement_date' => Carbon::now()->subDays(50),
                'type' => 'in',
                'quantity' => 40,
                'description' => 'Entrada de cables HDMI nuevos'
            ],
            [
                'inventory_id' => 8,
                'movement_date' => Carbon::now()->subDays(25),
                'type' => 'out',
                'quantity' => 15,
                'description' => 'Salida para sala de juntas'
            ],
            // Movimientos para Resaltador Amarillo (ID 9)
            [
                'inventory_id' => 9,
                'movement_date' => Carbon::now()->subDays(5),
                'type' => 'in',
                'quantity' => 120,
                'description' => 'Entrada de resaltadores nuevos'
            ],
            [
                'inventory_id' => 9,
                'movement_date' => Carbon::now()->subDays(2),
                'type' => 'out',
                'quantity' => 40,
                'description' => 'Salida para área académica'
            ],
            // Movimientos para Engrapadora Metálica (ID 10)
            [
                'inventory_id' => 10,
                'movement_date' => Carbon::now()->subDays(40),
                'type' => 'in',
                'quantity' => 25,
                'description' => 'Entrada de engrapadoras nuevas'
            ],
            [
                'inventory_id' => 10,
                'movement_date' => Carbon::now()->subDays(20),
                'type' => 'out',
                'quantity' => 5,
                'description' => 'Salida para nuevas estaciones de trabajo'
            ]
        ];

        DB::table('inventory_movements')->insert($movements);

    }
}
