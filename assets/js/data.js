// Configuration
const defaultConfig = {
  hero_name: "Sahrul Firdaus",
  hero_tagline: "Think, Learn, Do It",
  hero_role: "Data Enthusiast & Learner",
  hero_value_statement: "Turning raw data into meaningful decisions through analysis, visualization, and storytelling.",
  about_title: "About Me",
  contact_title: "Let's Connect",
  contact_subtitle: "I'm open to internships, collaborations, and learning opportunities. Let's discuss how we can work together!",
  background_color: "#FFFFFF",
  surface_color: "#F9FAFB",
  text_color: "#111827",
  primary_color: "#2563EB",
  secondary_color: "#1E40AF",
  font_family: "Poppins",
  font_size: 16
};


// Data
const projectsData = [
  {
    "id": 1,
    "title": "Superstore Dashboard Analytics",
    "titleId": "Analitik Dashboard Superstore",
    "description": "Comprehensive sales and profit performance analysis using interactive dashboard",
    "descriptionId": "Analisis kinerja penjualan dan profit komprehensif menggunakan dashboard interaktif",
    "category": "Business Intelligence",
    "tools": ["Python", "Pandas", "Plotly", "Streamlit"],
    "insights": [
      "High discount rates correlate with significant profit drops",
      "West region generated highest revenue across all segments",
      "Home Office segment showing consistent growth trend"
    ],
    "insightsId": [
      "Tingkat diskon tinggi berkorelasi dengan penurunan profit signifikan",
      "Region West menghasilkan revenue tertinggi di semua segmen",
      "Segmen Home Office menunjukkan tren pertumbuhan konsisten"
    ],
    "images": ["assets/img/superstore1.png", "assets/img/superstore2.png", "assets/img/superstore3.png"],
    "links": {
      "github": "https://github.com/SahrulFirdaus779",
      "dashboard": "https://syafii-dashboard.streamlit.app/",
      "presentation": "https://drive.google.com/file/d/13BvcxHwXSQ9EM4RWn_hJM2fQiFjLt3Vo/view",
      "demo": "https://drive.google.com/file/d/1kbDq3__WLbsrEYf_q2dqkQJLLN6wURXc/view"
    }
  },
  {
    "id": 2,
    "title": "Marriage is Scary - Social Phenomenon Analysis",
    "titleId": "Marriage is Scary - Analisis Fenomena Sosial",
    "description": "Statistical analysis comparing social perception vs actual marriage data in Indonesia (BPS 2018-2024)",
    "descriptionId": "Analisis statistik membandingkan persepsi sosial vs data pernikahan aktual di Indonesia (BPS 2018-2024)",
    "category": "Social Analytics",
    "tools": ["Python", "Pandas", "Seaborn", "Plotly", "Streamlit"],
    "insights": [
      "Marriage rates declined significantly during pandemic period",
      "Post-pandemic divorce rates showed upward trend",
      "Financial issues identified as dominant cause of divorce"
    ],
    "insightsId": [
      "Tingkat pernikahan menurun signifikan selama periode pandemi",
      "Tingkat perceraian pasca-pandemi menunjukkan tren naik",
      "Masalah finansial teridentifikasi sebagai penyebab dominan perceraian"
    ],
    "images": ["assets/img/Marriage1.png", "assets/img/Marriage2.png", "assets/img/Marriage3.png"],
    "links": {
      "github": "https://github.com/SahrulFirdaus779",
      "dashboard": "https://kelompokpemula.streamlit.app/",
      "article": "https://medium.com/@abiyyu03/ketika-menikah-karena-cinta-doang-gak-cukup-968cea73dd18"
    }
  },
  {
    "id": 3,
    "title": "BNPB Disaster Data Analysis & 2025 Forecasting",
    "titleId": "Analisis Data Bencana BNPB & Forecasting 2025",
    "description": "Time series analysis of disaster patterns and predictive modeling for 2025 using Prophet",
    "descriptionId": "Analisis time series pola bencana dan pemodelan prediktif untuk 2025 menggunakan Prophet",
    "category": "Predictive Analytics",
    "tools": ["Python", "Prophet", "Pandas", "Matplotlib"],
    "insights": [
      "Hydrometeorological disasters dominate disaster frequency",
      "Seasonal peaks identified in January-February period",
      "2025 forecast predicts increasing disaster frequency trend"
    ],
    "insightsId": [
      "Bencana hidrometeorologi mendominasi frekuensi bencana",
      "Puncak musiman teridentifikasi pada periode Januari-Februari",
      "Forecast 2025 memprediksi tren peningkatan frekuensi bencana"
    ],
    "images": ["assets/img/peramalan1.png", "assets/img/peramalan2.png", "assets/img/peramalan3.png"],
    "links": {
      "github": "https://github.com/SahrulFirdaus779",
      "presentation": "#presentation-ppt"
    }
  },
  {
    "id": 4,
    "title": "Pizza Sales Performance Dashboard",
    "titleId": "Dashboard Analisis Penjualan Pizza",
    "description": "Interactive Excel dashboard to analyze pizza sales performance based on revenue, product category, size variation, and monthly trends",
    "descriptionId": "Dashboard Excel interaktif untuk menganalisis performa penjualan pizza berdasarkan revenue, kategori produk, variasi ukuran, dan tren bulanan",
    "category": "Business Intelligence",
    "tools": ["Excel", "Pivot Table", "Power Query", "Charts & Visualization"],
    "insights": [
      "Total Revenue penjualan mencapai $817,860.05",
      "Total order tercatat sejumlah 21,351 pesanan",
      "Rata-rata nilai order adalah $38.31",
      "Kategori Pizza Veggie menjadi penjualan tertinggi dengan kontribusi terbesar",
      "Top-selling pizza didominasi menu dengan specialty topping unik",
      "Revenue bulanan mengalami peningkatan signifikan di pertengahan tahun"
    ],
    "insightsId": [
      "Total revenue: $817,860.05",
      "Jumlah pesanan: 21,351 order",
      "Average order value: $38.31",
      "Kategori Veggie mendominasi penjualan",
      "10 pizza terlaris didominasi varian special topping",
      "Revenue bulanan meningkat di pertengahan tahun"
    ],
    "images": [
      "assets/img/pizza_dashboard.png"
    ],
    "links": {
      "github": "https://github.com/SahrulFirdaus779/Learning-Excel"
    }
  },
  {
    "id": 5,
    "title": "Superstore Sales Performance Dashboard",
    "titleId": "Dashboard Analisis Penjualan Superstore",
    "description": "Interactive Looker Studio dashboard visualizing sales, profit ratio, segment distribution, and KPI metrics to analyze business performance across time.",
    "descriptionId": "Dashboard Looker Studio interaktif untuk memvisualisasikan penjualan, profit margin, distribusi segmen, dan KPI bisnis untuk menganalisis performa penjualan dari waktu ke waktu.",
    "category": "Business Intelligence / Visualization",
    "tools": ["Google Looker Studio", "Spreadsheet", "Data Modeling", "Time Series Visualization"],
    "insights": [
      "Total Sales mencapai $2.297.200,86 dari 5.009 transaksi",
      "Profit Margin sebesar 12,47% menunjukkan performa bisnis tergolong sehat",
      "Segment Consumer mendominasi penjualan dengan kontribusi terbesar (50,6%)",
      "Kategori Technology menghasilkan revenue tertinggi selama periode observasi",
      "Medium Profit menghasilkan pendapatan tertinggi dibanding Low dan Loss Profit",
      "Fluktuasi penjualan meningkat tajam pada pertengahan tahun dengan pola musiman yang terlihat jelas"
    ],
    "insightsId": [
      "Total penjualan: $2.297.200,86 | Total order: 5.009",
      "Rata-rata order value: $458,61 per transaksi",
      "Segmen Consumer paling dominan dalam kontribusi pendapatan",
      "Profit didorong oleh kategori Technology & Office Supplies",
      "Loss profit terjadi pada beberapa kategori seperti Machines",
      "Trend time-series menunjukkan peningkatan revenue di pertengahan tahun"
    ],
    "images": [
      "assets/img/looker_superstore_dashboard.png"
    ],
    "links": {
      "dashboard": "https://lookerstudio.google.com/reporting/9c910600-5dc1-42d1-a946-98152c567a33"
    }
  },
  {
    "id": 6,
    "title": "Fraud Detection & Profiling using Clustering",
    "titleId": "Deteksi Penipuan & Profiling menggunakan Clustering",
    "description": "Unsupervised learning project to segment financial transactions and identify potential anomalies or fraud patterns using K-Means clustering",
    "descriptionId": "Proyek pembelajaran tanpa pengawasan untuk mengelompokkan transaksi keuangan dan mengidentifikasi potensi anomali atau pola penipuan menggunakan K-Means clustering",
    "category": "Machine Learning / Clustering",
    "tools": ["Python", "Pandas", "Scikit-learn (KMeans, PCA)", "Matplotlib", "Seaborn"],
    "insights": [
      "Segmented transactions into 4 distinct profiles (e.g., High Value, Standard, Quick)",
      "Used PCA for dimensionality reduction to improve clustering performance",
      "Determined optimal clusters using Elbow Method and Silhouette Analysis"
    ],
    "insightsId": [
      "Mengelompokkan transaksi menjadi 4 profil berbeda (mis., Bernilai Tinggi, Standar, Cepat)",
      "Menggunakan PCA untuk reduksi dimensi guna meningkatkan kinerja clustering",
      "Menentukan jumlah klaster optimal menggunakan Metode Elbow dan Analisis Silhouette"
    ],
    "images": [
      "assets/img/fraud_profilling.jpg"
    ],
    "links": {
      "github": "https://github.com/SahrulFirdaus779/BMLP-Sahrul-Firdaus"
    }
  },
  {
    "id": 7,
    "title": "Transaction Classification & Fraud Prediction",
    "titleId": "Klasifikasi Transaksi & Prediksi Penipuan",
    "description": "Supervised learning project to classify transaction types based on varied features, achieving high accuracy with multiple models",
    "descriptionId": "Proyek pembelajaran mesin yang diawasi untuk mengklasifikasikan jenis transaksi berdasarkan berbagai fitur, mencapai akurasi tinggi dengan beberapa model",
    "category": "Machine Learning / Classification",
    "tools": ["Python", "Scikit-learn (Random Forest, Decision Tree, Logistic Regression)", "GridSearchCV"],
    "insights": [
      "Achieved 100% accuracy with Decision Tree and Random Forest models",
      "Performed Hyperparameter Tuning to ensure model robustness",
      "Validated model performance using Confusion Matrix and Classification Report"
    ],
    "insightsId": [
      "Mencapai akurasi 100% dengan model Decision Tree dan Random Forest",
      "Melakukan Tuning Hyperparameter untuk memastikan ketahanan model",
      "Memvalidasi kinerja model menggunakan Confusion Matrix dan Classification Report"
    ],
    "images": [
      "assets/img/fraud_prediction.jpg"
    ],
    "links": {
      "github": "https://github.com/SahrulFirdaus779/BMLP-Sahrul-Firdaus"
    }
  }
];

const experienceData = [
  {
    "title": "Advanced Data Analysis Project",
    "titleId": "Proyek Analisis Data Lanjutan",
    "period": "2024",
    "items": [
      "Built 3 comprehensive data analysis projects with real-world datasets",
      "Implemented time series forecasting using Prophet algorithm",
      "Created interactive dashboards with Streamlit for data visualization"
    ],
    "itemsId": [
      "Membangun 3 proyek analisis data komprehensif dengan dataset dunia nyata",
      "Mengimplementasikan forecasting time series menggunakan algoritma Prophet",
      "Membuat dashboard interaktif dengan Streamlit untuk visualisasi data"
    ]
  },
  {
    "title": "Machine Learning Fundamentals",
    "titleId": "Fundamental Machine Learning",
    "period": "2023-2024",
    "items": [
      "Mastered supervised and unsupervised learning algorithms",
      "Applied regression, classification, and clustering techniques",
      "Developed predictive models with 85%+ accuracy rates"
    ],
    "itemsId": [
      "Menguasai algoritma supervised dan unsupervised learning",
      "Menerapkan teknik regresi, klasifikasi, dan clustering",
      "Mengembangkan model prediktif dengan akurasi 85%+"
    ]
  },
  {
    "title": "Data Visualization Mastery",
    "titleId": "Penguasaan Visualisasi Data",
    "period": "2023",
    "items": [
      "Created compelling data stories using Matplotlib, Seaborn, and Plotly",
      "Designed dashboards following best practices in data visualization",
      "Transformed complex data into actionable insights for stakeholders"
    ],
    "itemsId": [
      "Membuat cerita data yang menarik menggunakan Matplotlib, Seaborn, dan Plotly",
      "Mendesain dashboard mengikuti best practices dalam visualisasi data",
      "Mengubah data kompleks menjadi insight yang actionable untuk stakeholder"
    ]
  }
];

const certificatesData = [
  {
    "title": "Belajar Machine Learning untuk Pemula",
    "titleId": "Sertifikat Belajar Machine Learning untuk Pemula",
    "organization": "Dicoding Indonesia",
    "year": "2025",
    "link": "https://www.dicoding.com/certificates/KEXL2E20WZG2"
  },
  {
    "title": "Memulai Pemrograman dengan Python",
    "titleId": "Sertifikat Memulai Pemrograman dengan Python",
    "organization": "Dicoding Indonesia",
    "year": "2025",
    "link": "https://dicoding.com/certificates/10P8204KVPQK"
  },
  {
    "title": "Belajar Dasar SQL",
    "titleId": "Sertifikat Belajar Dasar SQL",
    "organization": "Dicoding Indonesia",
    "year": "2024",
    "link": "https://dicoding.com/certificates/NVP750424XR0"
  },
  {
    "title": "Belajar Dasar Data Science",
    "titleId": "Sertifikat Belajar Dasar Data Science",
    "organization": "Dicoding Indonesia",
    "year": "2024",
    "link": "https://dicoding.com/certificates/JMZVE94RNPN9"
  },
  {
    "title": "Belajar Dasar Visualisasi Data",
    "titleId": "Sertifikat Belajar Dasar Visualisasi Data",
    "organization": "Dicoding Indonesia",
    "year": "2025",
    "link": "https://dicoding.com/certificates/6RPNRQD98X2M"
  },
  {
    "title": "Belajar Penggunaan Generative AI",
    "titleId": "Sertifikat Belajar Penggunaan Generative AI",
    "organization": "Dicoding Indonesia"
  }
];


