export const CERTIFICATIONS = [
  {
    id: "dp-900",
    name: "Microsoft Azure Data Fundamentals (DP-900)",
    level: "Entry Level (Pemula)",
    provider: "Microsoft",
    cost: "$99 (Sering ada voucher gratis/diskon mahasiswa)",
    description: "Sertifikasi pondasi data cloud terbaik untuk pemula. Menguji pemahaman konsep data relasional, non-relasional, data warehouse, dan analitik di cloud.",
    skillsTested: [
      "Core Data Concepts (Batch vs Streaming, OLTP vs OLAP)",
      "Relational Data on Azure (SQL Database, Synapse)",
      "Non-Relational Data (Cosmos DB, Blob Storage, Data Lake)",
      "Analytics Workloads (Power BI, Databricks)"
    ]
  },
  {
    id: "gcp-pde",
    name: "Google Cloud Professional Data Engineer",
    level: "Intermediate - Advanced",
    provider: "Google Cloud",
    cost: "$200",
    description: "Standar emas data engineer global. Menguji kemampuan merancang, membangun, dan mengoperasikan sistem data pipeline skala petabyte.",
    skillsTested: [
      "BigQuery Data Warehousing & Partitioning",
      "Cloud Dataflow (Apache Beam) Batch & Streaming",
      "Cloud Pub/Sub real-time messaging",
      "Dataproc (Apache Spark/Hadoop) migration",
      "Cloud Composer (Apache Airflow) DAG orchestration"
    ]
  },
  {
    id: "aws-dea",
    name: "AWS Certified Data Engineer - Associate (DEA-C01)",
    level: "Associate Level",
    provider: "AWS",
    cost: "$150",
    description: "Sertifikasi resmi terbaru AWS khusus data engineering. Sangat dicari korporasi dan tech startup pengguna infrastruktur AWS.",
    skillsTested: [
      "Data Ingestion & Transformation (AWS Glue, Kinesis, EMR)",
      "Data Storage & Management (Amazon S3, Redshift, Lake Formation)",
      "Data Modeling & Schema Evolution",
      "Data Security & Governance (IAM, KMS, Column Masking)"
    ]
  },
  {
    id: "databricks-associate",
    name: "Databricks Certified Data Engineer Associate",
    level: "Associate Level (Modern Lakehouse)",
    provider: "Databricks",
    cost: "$200",
    description: "Sertifikasi paling diminati di era arsitektur Lakehouse & Apache Spark. Membuktikan keahlian Delta Lake, PySpark, dan Databricks Workflows.",
    skillsTested: [
      "Delta Lake Architecture (ACID Transactions on Object Storage)",
      "PySpark Dataframe Transformation & Optimization",
      "Delta Live Tables (DLT) & Medallion Architecture (Bronze/Silver/Gold)",
      "Data Governance with Unity Catalog"
    ]
  }
];

export const ROADMAP_MODULES = [
  {
    id: 1,
    title: "Modul 1: Fondasi Logika Data, Relasional & SQL Modern",
    subtitle: "Bahasa Wajib Nomor 1 Data Engineer di Seluruh Dunia",
    badge: "Level 1: Dasar Mutlak",
    icon: "database",
    analogy: "Membangun lemari arsip super rapi berlabel. Bayangkan kamu seorang kurir logistik; SQL adalah daftar faktur dan instruksi pencarian barang terakurat.",
    summary: "Data Engineer bukan sekadar 'SELECT *'. Di level industri, kamu harus paham efisiensi join, window functions untuk analitik per sesi, serta optimasi query agar server database tidak tumbang.",
    keyConcepts: [
      {
        title: "OLTP vs OLAP",
        desc: "OLTP (Online Transaction Processing, misal PostgreSQL) untuk transaksi cepat per detik (e-commerce checkout). OLAP (Online Analytical Processing, misal BigQuery/Snowflake) untuk analisa agregasi jutaan baris sekaligus."
      },
      {
        title: "Window Functions (OVER, PARTITION BY)",
        desc: "Menghitung agregasi bergerak (running total, ranking gaji per divisi) tanpa harus me-GROUP BY yang memotong baris data."
      },
      {
        title: "Normalisasi (3NF) vs Denormalisasi (Star Schema)",
        desc: "Normalisasi menghilangkan duplikasi data untuk hemat storage dan integritas. Di data warehouse modern, kita justru mendenormalisasi menjadi Fact & Dimension Table agar query analitik berjalan secepat kilat."
      }
    ],
    codeSnippet: {
      lang: "sql",
      title: "Contoh SQL Tingkat Menengah: Running Total & Ranking Menggunakan Window Functions",
      code: `-- Menghitung akumulasi transaksi harian per pengguna & ranking transaksi terbesar
WITH daily_transactions AS (
    SELECT 
        user_id,
        transaction_date,
        amount,
        -- Running Total (Akumulasi saldo berjalan per user)
        SUM(amount) OVER (
            PARTITION BY user_id 
            ORDER BY transaction_date
        ) AS running_balance,
        -- Peringkat transaksi terbesar per user
        DENSE_RANK() OVER (
            PARTITION BY user_id 
            ORDER BY amount DESC
        ) AS spending_rank
    FROM raw_payments
)
SELECT * 
FROM daily_transactions 
WHERE spending_rank <= 3
ORDER BY user_id, transaction_date;`
    },
    practiceTask: "Tuliskan query SQL yang mengelompokkan data penjualan bulanan dan hitung persentase kenaikan penjualan dibanding bulan sebelumnya menggunakan LAG()."
  },
  {
    id: 2,
    title: "Modul 2: Pemrograman Data Pipeline dengan Python & Polars/Pandas",
    subtitle: "Automasi Ekstraksi, Transformasi, dan Validasi Data",
    badge: "Level 2: Core Engineering",
    icon: "code",
    analogy: "Pabrik penyaring air: air kotor dari sungai (raw messy data) dipompa pipa, disaring lumpurnya, disterilkan bakterinya, hingga siap minum (clean data).",
    summary: "Python adalah bahasa kedua terpenting. Kamu akan belajar mengolah format file data modern (Parquet, JSON Lines, CSV) dan menulis script transform data yang idempotent (bisa diulang kapan saja tanpa merusak data).",
    keyConcepts: [
      {
        title: "Mengapa Format Parquet Mengalahkan CSV?",
        desc: "CSV menyimpan data per baris secara teks murni (boros dan lambat). Parquet menyimpan data per kolom (columnar) dengan kompresi Snappy, sehingga query analitik hanya membaca kolom yang dibutuhkan dan 10x lebih hemat biaya cloud!"
      },
      {
        title: "Data Type Casting & Sanitasi",
        desc: "Mengubah string tanggal ke format datetime timezone-aware, menangani nilai NULL/NaN agar tidak merusak perhitungan matematika di tahap downstream."
      },
      {
        title: "Idempotency dalam Pipeline",
        desc: "Prinsip rekayasa: jika pipeline kamu dijalankan 5 kali pada tanggal yang sama, outputnya harus tetap identik dan tidak menduplikasi baris."
      }
    ],
    codeSnippet: {
      lang: "python",
      title: "Contoh Python Script ETL Ringan & Efisien (Ekstrak -> Bersihkan -> Tulis Parquet)",
      code: `import pandas as pd
import datetime

def clean_ecommerce_data(raw_csv_path: str, output_parquet_path: str):
    print(f"[*] Mengekstrak data dari: {raw_csv_path}")
    df = pd.read_csv(raw_csv_path)

    # 1. Sanitasi & Penanganan Nilai Kosong
    df["order_id"] = df["order_id"].astype(str)
    df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")
    df = df.dropna(subset=["order_id", "order_date"])

    # 2. Transformasi Bisnis (Hitung Total Bersih)
    df["net_revenue"] = df["gross_amount"] - df["discount_amount"]
    
    # 3. Partisi Metadata Pipeline
    df["processed_at"] = datetime.datetime.now(datetime.timezone.utc)

    # 4. Simpan ke Columnar Parquet dengan kompresi snappy
    df.to_parquet(output_parquet_path, engine="pyarrow", compression="snappy", index=False)
    print(f"[✓] Berhasil mengonversi {len(df)} baris data ke {output_parquet_path}")

if __name__ == "__main__":
    clean_ecommerce_data("orders_2026.csv", "clean_orders_2026.parquet")`
    },
    practiceTask: "Buat script Python yang membaca file log web JSON, mengambil IP address, menghitung request error status 500, lalu mengekspor hasil agregasi ke Parquet."
  },
  {
    id: 3,
    title: "Modul 3: Arsitektur Modern Data Warehouse & Lakehouse",
    subtitle: "Mendesain Penyimpanan Data Skala Raksasa di Era Cloud",
    badge: "Level 3: Architecture",
    icon: "layers",
    analogy: "Medallion Architecture seperti proses pembuatan perhiasan: Tambang Emas Kasar (Bronze) -> Pemurnian Batangan Perak (Silver) -> Cincin Emas Siap Pakai di Etalase Toko (Gold).",
    summary: "Di era sekarang, batas antara Data Lake (tempat buang data mentah) dan Data Warehouse (tabel analitik terstruktur) telah menyatu menjadi **Data Lakehouse** berkat teknologi seperti Delta Lake dan Apache Iceberg.",
    keyConcepts: [
      {
        title: "Medallion Architecture (Bronze -> Silver -> Gold)",
        desc: "Bronze = Data mentah persis seperti aslinya. Silver = Data yang sudah divalidasi, dideduplikasi, dan diseragamkan tipe datanya. Gold = Data agregasi bisnis siap dikonsumsi dashboard Power BI atau model Machine Learning."
      },
      {
        title: "Partisi & Clustering (BigQuery / Snowflake)",
        desc: "Memisahkan tabel berdasarkan tanggal (misal: partition by DATE(created_at)). Saat analyst mencari data bulan Oktober, database hanya menscan file bulan Oktober saja, memangkas biaya dari $100 menjadi $0.50!"
      },
      {
        title: "Slowly Changing Dimensions (SCD Type 2)",
        desc: "Cara mencatat riwayat perubahan data pelanggan (misal: pindah alamat kota) tanpa menghapus alamat lamanya, menggunakan kolom valid_from, valid_to, dan is_current."
      }
    ],
    codeSnippet: {
      lang: "sql",
      title: "Desain Skema Lakehouse dengan Partisi & Clustering di BigQuery",
      code: `-- Membuat tabel transaksi berpartisi tanggal dan bercluster ID cabang
CREATE OR REPLACE TABLE \`production_lakehouse.gold_daily_sales\`
(
    transaction_id STRING,
    store_id STRING,
    transaction_time TIMESTAMP,
    customer_tier STRING,
    total_sales NUMERIC,
    items_count INT64
)
PARTITION BY DATE(transaction_time)
CLUSTER BY store_id, customer_tier
OPTIONS (
    description = "Gold layer tabel penjualan teragregasi untuk dashboard eksekutif",
    require_partition_filter = TRUE -- Memaksa query selalu mencantumkan filter tanggal agar hemat biaya!
);`
    },
    practiceTask: "Rancanglah tabel Slowly Changing Dimension Type 2 (SCD2) untuk data status langganan pengguna (Free -> Premium -> Cancelled) lengkap dengan kolom tanggal berlaku."
  },
  {
    id: 4,
    title: "Modul 4: Data Orchestration & Scheduling dengan Apache Airflow",
    subtitle: "Konduktor Orkestrasi yang Menjalankan Ratusan Pipeline Otomatis",
    badge: "Level 4: Automation",
    icon: "git-commit",
    analogy: "Sutradara film atau konduktor orkestra: 'Biola main dulu, setelah biola selesai baru terompet masuk. Kalau terompet fals, bunyikan alarm dan ulangi bagian itu!'",
    summary: "Data pipeline tidak dijalankan manual atau cron sederhana. Airflow menggunakan DAG (Directed Acyclic Graph) berbasis kode Python untuk mengatur ketergantungan antar tugas, retry otomatis saat jaringan gagal, dan alert Discord/Slack.",
    keyConcepts: [
      {
        title: "Konsep DAG (Directed Acyclic Graph)",
        desc: "Alur kerja yang memiliki arah pasti (A -> B -> C) dan tidak boleh berputar kembali ke awal (Acyclic). Tugas B hanya jalan setelah tugas A sukses."
      },
      {
        title: "Backfilling & Catchup",
        desc: "Kemampuan sakti Airflow untuk memproses ulang data historis 1 tahun ke belakang hanya dengan mengubah tanggal mulai DAG, tanpa perlu merombak script!"
      },
      {
        title: "Sensors & Operators",
        desc: "Sensor bertugas 'menunggu' sampai file data mendarat di cloud storage (S3/GCS). Begitu file ada, Operator langsung mengeksekusi transformasi data."
      }
    ],
    codeSnippet: {
      lang: "python",
      title: "Contoh Airflow DAG Modern Menggunakan TaskFlow API",
      code: `from airflow.decorators import dag, task
import pendulum

@dag(
    dag_id="daily_ecommerce_pipeline",
    schedule="0 2 * * *", # Berjalan setiap hari jam 02:00 pagi WIB
    start_date=pendulum.datetime(2026, 1, 1, tz="Asia/Jakarta"),
    catchup=False,
    tags=["production", "lakehouse"]
)
def daily_pipeline():

    @task()
    def extract_raw_data() -> str:
        print("Mengunduh data transaksi kemarin dari API bank...")
        return "/tmp/raw_bank_data.csv"

    @task()
    def transform_to_silver(file_path: str) -> str:
        print(f"Menyaring dan memvalidasi integritas data: {file_path}")
        return "/tmp/silver_transactions.parquet"

    @task()
    def load_to_warehouse(parquet_path: str):
        print(f"Memuat data ke Google BigQuery / Snowflake: {parquet_path}")
        print("✓ Pipeline sukses dieksekusi!")

    # Mengatur dependency: Extract -> Transform -> Load
    raw = extract_raw_data()
    silver = transform_to_silver(raw)
    load_to_warehouse(silver)

pipeline_execution = daily_pipeline()`
    },
    practiceTask: "Buat konsep DAG yang memiliki 2 tugas ekstraksi paralel (Data Cabang A & Cabang B), yang kemudian disatukan oleh 1 tugas konsolidasi sebelum dimuat ke database."
  },
  {
    id: 5,
    title: "Modul 5: Big Data Processing dengan Apache Spark & PySpark",
    subtitle: "Komputasi Terdistribusi untuk Memproses Data Miliaran Baris",
    badge: "Level 5: Big Data Engine",
    icon: "cpu",
    analogy: "Jika 1 koki memasak 1000 porsi butuh 10 jam (Pandas di 1 laptop), panggil 10 koki yang bekerja serentak di 10 wajan (Spark Cluster) agar selesai dalam 15 menit!",
    summary: "Saat ukuran dataset melampaui kapasitas RAM laptop (100 GB hingga puluhan Terabyte), library biasa akan crash Out-Of-Memory. Spark memecah dataset menjadi partisi-partisi kecil dan membagikannya ke puluhan server worker secara paralel.",
    keyConcepts: [
      {
        title: "RDD vs DataFrame vs Dataset",
        desc: "Spark DataFrame memberikan optimasi Catalyst Optimizer tercanggih, menyusun rencana eksekusi fisik (physical execution plan) terbaik secara otomatis di balik layar."
      },
      {
        title: "Lazy Evaluation",
        desc: "Spark tidak langsung mengeksekusi komputasi saat kamu menulis transformasi (.filter(), .select()). Spark baru bergerak saat kamu memanggil 'Action' seperti .count(), .collect(), atau .write()!"
      },
      {
        title: "Shuffling & Data Skewness",
        desc: "Tantangan terbesar data engineer: ketika data tidak merata dan satu worker bekerja jauh lebih keras dibanding yang lain. Cara mengatasinya adalah dengan salting key dan repartitioning."
      }
    ],
    codeSnippet: {
      lang: "python",
      title: "Contoh PySpark: Membaca Miliar Baris Data dan Menghitung Agregasi Terdistribusi",
      code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum as _sum, desc

# Inisialisasi Spark Session
spark = SparkSession.builder \\
    .appName("LogisticsBigDataAnalytics") \\
    .config("spark.sql.shuffle.partitions", "200") \\
    .getOrCreate()

print("[*] Membaca dataset Parquet skala besar dari Cloud Object Storage...")
df = spark.read.parquet("s3a://data-lake-raw/shipping_records/*.parquet")

# Transformasi terdistribusi: Filter pengiriman gagal & agregasi kerugian per wilayah
high_impact_losses = df.filter(col("delivery_status") == "FAILED") \\
    .groupBy("destination_province") \\
    .agg(_sum("package_insurance_value").alias("total_loss_idr")) \\
    .filter(col("total_loss_idr") > 50000000) \\
    .orderBy(desc("total_loss_idr"))

# Action: Menuliskan hasil ke Delta Lake Gold Table
high_impact_losses.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .save("s3a://data-lakehouse-gold/provincial_shipping_losses")

print("[✓] Komputasi Spark terdistribusi selesai tanpa kendala memori!")`
    },
    practiceTask: "Jelaskan perbedaan antara 'Narrow Transformation' (misal: map/filter yang tidak butuh tukar data antar node) dengan 'Wide Transformation' (misal: groupBy/join yang memicu shuffle jaringan)."
  },
  {
    id: 6,
    title: "Modul 6: Streaming Data Real-Time dengan Apache Kafka",
    subtitle: "Menangkap dan Memproses Peristiwa Detik itu Juga (Event-Driven)",
    badge: "Level 6: Streaming",
    icon: "activity",
    analogy: "Stasiun Radio atau Ban Berjalan Pabrik: Data mengalir tanpa henti 24/7. Toko e-commerce tidak bisa menunggu besok subuh untuk mendeteksi penipuan kartu kredit; transaksi harus dicek dalam 50 milidetik!",
    summary: "Dunia beralih dari batch harian ke streaming detik. Kafka bertindak sebagai log terdistribusi dengan throughput jutaan pesan per detik yang menjamin tidak ada data yang hilang meskipun sistem downstream down.",
    keyConcepts: [
      {
        title: "Producer, Topic, Partition, Consumer Group",
        desc: "Producer menghasilkan pesan (event). Topic adalah kategori tempat pesan disimpan. Partition memungkinkan pesan dibagi rata ke banyak mesin. Consumer Group membaca pesan bersamaan secara paralel."
      },
      {
        title: "At-Least-Once vs Exactly-Once Semantics",
        desc: "Dalam transaksi finansial, pesan tidak boleh terproses dua kali (double deduction). Kafka mendukung transaksi Exactly-Once (EOS) untuk integritas moneter mutlak."
      },
      {
        title: "Kafka Streams & Flink",
        desc: "Engine pemroses data yang mengalir: menghitung rata-rata suhu sensor IoT setiap jendela waktu 5 menit (Tumbling Window) secara realtime."
      }
    ],
    codeSnippet: {
      lang: "python",
      title: "Contoh Python Producer Kafka untuk Event Transaksi Real-time",
      code: `import json
import time
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def emit_user_click(user_id: str, action: str):
    payload = {
        "user_id": user_id,
        "action": action,
        "timestamp_ms": int(time.time() * 1000)
    }
    # Kirim ke topik 'user-clickstream' dengan key user_id agar partisi terurut konsisten
    producer.send('user-clickstream', key=user_id.encode('utf-8'), value=payload)
    print(f"[Streaming Event] Dikirim: {payload}")

emit_user_click("usr_1087", "CHECKOUT_CLICKED")
producer.flush()`
    },
    practiceTask: "Sebutkan mengapa Kafka menyimpan data ke disk menggunakan sequential I/O dan mengapa hal ini menjadikannya sangat cepat dibanding database relasional konvensional."
  }
];

export const MOCK_EXAM_QUESTIONS = [
  {
    id: 1,
    category: "SQL & Relational",
    question: "Anda diminta menghitung gaji rata-rata per departemen, namun setiap baris karyawan tetap harus menampilkan nama karyawannya beserta selisih gajinya dengan rata-rata departemen tersebut. Fitur SQL apa yang paling efisien?",
    options: [
      "Menggunakan GROUP BY departemen lalu melakukan self-join kembali ke tabel karyawan",
      "Menggunakan Window Function: AVG(salary) OVER (PARTITION BY department_id)",
      "Menggunakan correlated subquery di klausa WHERE",
      "Membuat tabel sementara (temporary table) lalu mengupdate kolom satu per satu"
    ],
    correctIndex: 1,
    explanation: "Window Function dengan OVER (PARTITION BY department_id) adalah pendekatan standar industri paling cepat karena mengevaluasi agregasi per kelompok tanpa menghilangkan baris detail individu atau membutuhkan self-join yang mahal."
  },
  {
    id: 2,
    category: "Storage & File Format",
    question: "Sebuah perusahaan memiliki tabel log klik pengguna berukuran 5 TB dalam format CSV di Amazon S3. Query analitik harian terasa sangat lambat dan memakan biaya scan S3 yang mahal. Langkah optimasi utama apa yang harus Anda terapkan?",
    options: [
      "Mengompresi file CSV tersebut menjadi file .zip",
      "Mengonversi dataset menjadi format Parquet berbasis kolom (columnar) dengan partisi tanggal",
      "Mengubah seluruh data menjadi format JSON terstruktur",
      "Menyimpan file CSV ke hard disk SSD lokal di server aplikasi"
    ],
    correctIndex: 1,
    explanation: "Parquet adalah format kolom yang memadatkan data hingga 70-80% dan memungkinkan query engine hanya membaca kolom tertentu (column projection) serta melewati partisi tanggal yang tidak dicari (partition pruning)."
  },
  {
    id: 3,
    category: "Architecture & Lakehouse",
    question: "Dalam Medallion Architecture (Lakehouse), lapisan manakah yang berisi data bisnis yang telah dibersihkan, divalidasi skemanya, dan dideduplikasi, namun belum diagregasi ke metrik laporan final?",
    options: [
      "Bronze Layer",
      "Silver Layer",
      "Gold Layer",
      "Platinum Layer"
    ],
    correctIndex: 1,
    explanation: "Bronze menyimpan data mentah as-is. Silver adalah lapisan 'single source of truth' yang telah dibersihkan dan diseragamkan. Gold adalah lapisan metrik bisnis agregasi final siap pakai."
  },
  {
    id: 4,
    category: "Orchestration & Workflow",
    question: "Dalam Apache Airflow, apa tujuan utama dari menyetel parameter 'catchup=False' pada sebuah DAG?",
    options: [
      "Mencegah Airflow menjalankan seluruh jadwal historis yang terlewat antara start_date dan tanggal hari ini secara massal",
      "Membuat DAG berjalan lebih cepat dengan mematikan validasi sintaks Python",
      "Menonaktifkan logging eksekusi ke disk agar hemat ruang penyimpanan",
      "Menghentikan DAG jika ada tugas yang gagal tanpa mengirimkan notifikasi"
    ],
    correctIndex: 0,
    explanation: "Jika catchup=True secara default, Airflow akan mengeksekusi semua run yang terlewat dari start_date sampai sekarang, yang dapat membebani server database secara tidak sengaja."
  },
  {
    id: 5,
    category: "Big Data & Distributed Computing",
    question: "Pada Apache Spark, manakah di antara operasi berikut yang merupakan sebuah 'Action' yang benar-benar memicu eksekusi komputasi (bukan transformasi malas / lazy evaluation)?",
    options: [
      "df.filter(col('status') == 'ACTIVE')",
      "df.select('user_id', 'amount')",
      "df.count()",
      "df.withColumn('new_col', col('val') * 2)"
    ],
    correctIndex: 2,
    explanation: "Operasi .filter(), .select(), dan .withColumn() adalah Transformation yang dievaluasi secara malas (lazy). Sedangkan .count(), .collect(), .show(), dan .write() adalah Action yang memaksa Spark menjalankan graph komputasi fisik."
  }
];
