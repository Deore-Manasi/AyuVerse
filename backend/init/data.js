const samplePlants = [
  {
    plantName: "Tulsi",
    plantSize: "Typically grows up to 60 cm (2 feet) in height",
    image: "https://cdn.britannica.com/87/207887-050-F48CB55D/basil.jpg",
    nativeRegion: "Indian Subcontinent",
    preferredClimate: "Warm, tropical and subtropical climates",
    reqSunlight: "Full sun to partial shade",
    reqSoil: "Well-drained, fertile soil rich in organic matter",
    partMedicine: "Leaves",
    activeCompounds: "Eugenol, Rosmarinic acid, Luteolin, Ursolic acid",
    therapeuticProp:
      "Adaptogenic, Antioxidant, Anti-inflammatory, Immunomodulatory",
    dosageForm: "Tea, Capsules, Tinctures, Essential oils",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/tulsi.glb",
    ayushApp: {
      ayurveda:
        "Used for respiratory disorders, stress relief, and immune enhancement.",
      unani: "Used in cough, cold, and digestive disorders.",
      siddha: "Used for skin problems and respiratory ailments.",
    },
    benefits: {
      a: "Reduces stress and anxiety.",
      b: "Improves respiratory health.",
      c: "Boosts immunity.",
      d: "Acts as a natural detoxifier.",
    },
    family: "Lamiaceae",
    genus: "Ocimum",
    size: "60 cm",
    voiceDesc:
      "Tulsi, also called Holy Basil, is a sacred and highly valued medicinal herb found in almost every Indian household. It is widely used in Ayurveda to strengthen immunity, relieve cough and cold, improve breathing, and reduce stress. Regular consumption helps the body adapt to infections and environmental stress while promoting overall wellness and vitality.",
  },

  {
    plantName: "Ashwagandha",
    plantSize: "Grows up to 1.5 meters in height",
    image:
      "https://ask-ayurveda.com/_med/resize_image.webp/?url=https%3A%2F%2Fask-ayurveda.com%2Fmedia%2Fuploads%2Fwiki%2FWithania_somnifera_-_Ashwagandha.png&height=428",
    nativeRegion:
      "Rajasthan, Madhya Pradesh, Gujarat, Punjab, and dry regions of North-West India",
    preferredClimate: "Dry subtropical regions",
    reqSunlight: "Full sun",
    reqSoil: "Dry, well-drained sandy soil",
    partMedicine: "Roots",
    activeCompounds: "Withanolides, Alkaloids",
    therapeuticProp: "Adaptogenic, Anti-stress, Neuroprotective",
    dosageForm: "Powder, Capsules, Tablets",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/ashvagandha.glb",
    ayushApp: {
      ayurveda: "Used for stress management, strength, and vitality.",
      unani: "Used as tonic and rejuvenator.",
      siddha: "Used for nervous system support.",
    },
    benefits: {
      a: "Reduces stress and anxiety.",
      b: "Improves stamina and strength.",
      c: "Supports brain health.",
      d: "Enhances sleep quality.",
    },
    family: "Solanaceae",
    genus: "Withania",
    size: "1.5 meters",
    voiceDesc:
      "Ashwagandha is a powerful adaptogenic herb traditionally cultivated in the dry regions of India. Its roots are used to improve strength, stamina, and mental clarity while helping the body cope with stress and fatigue. It supports the nervous system, enhances sleep quality, and promotes long-term energy, making it one of the most important rejuvenating herbs in Ayurveda.",
  },

  {
    plantName: "Aloe Vera",
    plantSize: "Succulent plant growing up to 1 meter",
    image:
      "https://cdn.shopify.com/s/files/1/0968/5384/files/Outdoor-Aloe-vera-jpj_1200x600.jpg?v=1720529930",
    nativeRegion:
      "Rajasthan, Gujarat, Tamil Nadu, Andhra Pradesh, and other dry regions of India",
    preferredClimate: "Hot and dry climates",
    reqSunlight: "Bright sunlight",
    reqSoil: "Sandy, well-drained soil",
    partMedicine: "Leaves (gel)",
    activeCompounds: "Aloin, Aloe-emodin, Polysaccharides",
    therapeuticProp: "Anti-inflammatory, Healing, Hydrating",
    dosageForm: "Gel, Juice, Cream",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/aloe_vera.glb",
    ayushApp: {
      ayurveda: "Used for skin health and digestion.",
      unani: "Used for wound healing.",
      siddha: "Used for burns and skin care.",
    },
    benefits: {
      a: "Soothes skin burns.",
      b: "Improves digestion.",
      c: "Hydrates skin.",
      d: "Promotes wound healing.",
    },
    family: "Asphodelaceae",
    genus: "Aloe",
    size: "1 meter",
    voiceDesc:
      "Aloe Vera is a succulent medicinal plant commonly cultivated in the dry and warm regions of India. Its gel-filled leaves are widely used for soothing burns, healing wounds, improving digestion, and hydrating the skin. Known for its cooling and healing nature, it is frequently used in both home remedies and herbal skincare preparations.",
  },

  {
    plantName: "Adulsa",
    plantSize: "Shrub growing up to 2–3 meters",
    image:
      "https://plantsguru.com/cdn/shop/files/plantsguru-medicinal-plants-adulsa.jpg?v=1735618409&width=1100",
    nativeRegion: "Indian Subcontinent",
    preferredClimate: "Warm tropical climate",
    reqSunlight: "Full sun to partial shade",
    reqSoil: "Well-drained loamy soil",
    partMedicine: "Leaves",
    activeCompounds: "Vasicine, Vasicinone",
    therapeuticProp: "Expectorant, Bronchodilator, Anti-inflammatory",
    dosageForm: "Juice, Syrup, Decoction",
    glb3D: "supabase/plants/3d/adulsa.glb",
    ayushApp: {
      ayurveda: "Used for cough, asthma, and bronchitis.",
      unani: "Used for respiratory congestion.",
      siddha: "Used for cold and throat infections.",
    },
    benefits: {
      a: "Clears mucus.",
      b: "Improves breathing.",
      c: "Relieves cough.",
      d: "Supports lung health.",
    },
    family: "Acanthaceae",
    genus: "Justicia",
    size: "3 meters",
    voiceDesc:
      "Adulsa, also known as Vasaka or Malabar Nut, is a traditional Ayurvedic herb widely used to treat respiratory problems. Its leaves help clear mucus, soothe the throat, and improve breathing. It is commonly prepared as kadha or syrup for cough, cold, and asthma relief.",
  },

  {
    plantName: "Amla",
    plantSize: "Medium tree up to 8–10 meters",
    image:
      "https://cdn.shopify.com/s/files/1/1154/2492/files/amla-fruit_large.jpeg?v=1562926377",
    nativeRegion: "Indian Subcontinent",
    preferredClimate: "Subtropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Light, well-drained soil",
    partMedicine: "Fruit",
    activeCompounds: "Vitamin C, Tannins, Gallic acid",
    therapeuticProp: "Antioxidant, Rejuvenating, Immunomodulatory",
    dosageForm: "Juice, Powder, Chyawanprash",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/amla.glb",
    ayushApp: {
      ayurveda: "Used for immunity and digestion.",
      unani: "Used as cooling tonic.",
      siddha: "Used for hair and skin care.",
    },
    benefits: {
      a: "Boosts immunity.",
      b: "Improves digestion.",
      c: "Enhances skin glow.",
      d: "Supports hair health.",
    },
    family: "Phyllanthaceae",
    genus: "Phyllanthus",
    size: "10 meters",
    voiceDesc:
      "Amla, also called Indian Gooseberry, is one of the richest natural sources of vitamin C. It strengthens immunity, improves digestion, and rejuvenates the body. It is widely used in tonics like Chyawanprash and is known to support hair, skin, and overall vitality.",
  },

  {
    plantName: "Arjuna",
    plantSize: "Large tree up to 25–30 meters",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Fruit_I_IMG_9577.jpg",
    nativeRegion: "Maharashtra, Western Ghats, river banks across India",
    preferredClimate: "Tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Moist riverbank soil",
    partMedicine: "Bark",
    activeCompounds: "Arjunolic acid, Tannins, Flavonoids",
    therapeuticProp: "Cardioprotective, Antioxidant, Anti-inflammatory",
    dosageForm: "Powder, Decoction, Arjunarishta",
    glb3D: "supabase/plants/3d/arjuna.glb",
    ayushApp: {
      ayurveda: "Used for heart health and blood pressure.",
      unani: "Used as cardiac tonic.",
      siddha: "Used for circulation support.",
    },
    benefits: {
      a: "Strengthens heart.",
      b: "Controls blood pressure.",
      c: "Improves circulation.",
      d: "Supports cholesterol balance.",
    },
    family: "Combretaceae",
    genus: "Terminalia",
    size: "30 meters",
    voiceDesc:
      "Arjuna is a majestic tree commonly seen near rivers and forest areas of Maharashtra. Its bark is a powerful heart tonic traditionally used to strengthen cardiac muscles and improve circulation. Regular use supports healthy blood pressure and cholesterol levels, making it one of the most trusted herbs for heart care.",
  },

  {
    plantName: "Bael",
    plantSize: "Tree up to 12 meters",
    image: "https://kj1bcdn.b-cdn.net/media/97751/untitled-design-5.png",
    nativeRegion: "North India, Central India, Bihar, Uttar Pradesh",
    preferredClimate: "Dry tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Dry sandy soil",
    partMedicine: "Fruit, Leaves",
    activeCompounds: "Marmelosin, Tannins",
    therapeuticProp: "Digestive, Anti-diarrheal, Anti-inflammatory",
    dosageForm: "Juice, Powder",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/bael.glb",
    ayushApp: {
      ayurveda: "Used for stomach disorders.",
      unani: "Used for diarrhea.",
      siddha: "Used for digestive strength.",
    },
    benefits: {
      a: "Improves digestion.",
      b: "Controls diarrhea.",
      c: "Relieves acidity.",
      d: "Cools the body.",
    },
    family: "Rutaceae",
    genus: "Aegle",
    size: "12 meters",
    voiceDesc:
      "Bael, also known as Bilva, is a sacred tree whose fruit is highly beneficial for the digestive system. It helps manage diarrhea, acidity, and stomach disorders while strengthening gut health. Its cooling nature makes it especially useful during hot seasons.",
  },

  {
    plantName: "Baheda",
    plantSize: "Large tree growing up to 20–25 meters",
    image:
      "https://ooofarms.com/cdn/shop/files/OOO_Farms_Wild_Food_Baheda_01.jpg?v=1718349041&width=1100",
    nativeRegion:
      "Maharashtra, Madhya Pradesh, Chhattisgarh, and forests of Central India",
    preferredClimate: "Tropical forest climate",
    reqSunlight: "Full sun",
    reqSoil: "Moist well-drained soil",
    partMedicine: "Fruit",
    activeCompounds: "Tannins, Gallic acid, Ellagic acid",
    therapeuticProp: "Antioxidant, Digestive, Respiratory tonic",
    dosageForm: "Powder, Decoction, Triphala formulation",
    glb3D: "supabase/plants/3d/baheda.glb",
    ayushApp: {
      ayurveda: "Used for cough and digestion.",
      unani: "Used for respiratory problems.",
      siddha: "Used for detoxification.",
    },
    benefits: {
      a: "Improves digestion.",
      b: "Relieves cough.",
      c: "Supports immunity.",
      d: "Acts as detoxifier.",
    },
    family: "Combretaceae",
    genus: "Terminalia",
    size: "25 meters",
    voiceDesc:
      "Baheda is a tall medicinal tree commonly found in the forests of Maharashtra and central India. Its fruits are one of the three ingredients of the famous Triphala formulation. It helps improve digestion, clear respiratory congestion, and protect the body from oxidative stress, making it highly valued in Ayurvedic medicine.",
  },

  {
    plantName: "Brahmi",
    plantSize: "Small creeping herb",
    image:
      "https://www.thepahadistory.com/cdn/shop/articles/Brahmi_plant_06e6c1ee-9e93-401f-a0f6-6babd31e7fbf.jpg?v=1751965374&width=1400",
    nativeRegion: "Wetlands of India including Kerala, West Bengal, Assam",
    preferredClimate: "Moist tropical climate",
    reqSunlight: "Partial sun",
    reqSoil: "Wet marshy soil",
    partMedicine: "Whole plant",
    activeCompounds: "Bacosides",
    therapeuticProp: "Neuroprotective, Memory enhancer, Anti-anxiety",
    dosageForm: "Syrup, Powder, Capsules",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/brahmi.glb",
    ayushApp: {
      ayurveda: "Used for memory and concentration.",
      unani: "Used for brain tonic.",
      siddha: "Used for nerve support.",
    },
    benefits: {
      a: "Improves memory.",
      b: "Reduces anxiety.",
      c: "Enhances focus.",
      d: "Supports brain health.",
    },
    family: "Plantaginaceae",
    genus: "Bacopa",
    size: "Creeper",
    voiceDesc:
      "Brahmi is a well-known brain tonic herb traditionally used to enhance memory, learning, and concentration. It helps calm the mind, reduce anxiety, and improve cognitive performance. Students and elderly people commonly use it for mental clarity and nervous system support.",
  },

  {
    plantName: "Chandan",
    plantSize: "Small evergreen tree up to 10–12 meters",
    image:
      "https://anandigreens.com/cdn/shop/files/1_674e22fe-5483-4f2d-8199-036a4f36e629_1029x1029.jpg?v=1755243501",
    nativeRegion: "Karnataka, Tamil Nadu, Kerala",
    preferredClimate: "Dry tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Red sandy or well-drained soil",
    partMedicine: "Heartwood",
    activeCompounds: "Santalol, Santalenes",
    therapeuticProp: "Cooling, Anti-inflammatory, Antiseptic",
    dosageForm: "Paste, Powder, Oil",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/chandan.glb",
    ayushApp: {
      ayurveda: "Used for skin diseases and cooling therapy.",
      unani: "Used as aromatic and antiseptic.",
      siddha: "Used for burns and skin care.",
    },
    benefits: {
      a: "Cools the body.",
      b: "Improves skin health.",
      c: "Reduces inflammation.",
      d: "Calms the mind.",
    },
    family: "Santalaceae",
    genus: "Santalum",
    size: "12 meters",
    voiceDesc:
      "Chandan, or Indian Sandalwood, is a fragrant medicinal tree highly valued for its cooling and soothing properties. The heartwood paste is traditionally applied to the skin to treat rashes, burns, and inflammation. Its aroma also helps calm the mind and reduce stress.",
  },

  {
    plantName: "Chirchita",
    plantSize: "Herb growing up to 1 meter",
    image:
      "https://cdn.shopify.com/s/files/1/0252/0904/5067/files/100_Achyranthes_aspera_Seeds_Prickly_Chaff_Flower_Seeds_Chaff_flower_Seeds_600x600.jpg?v=1702111265",
    nativeRegion: "Across India including roadsides and fields",
    preferredClimate: "Tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Dry sandy soil",
    partMedicine: "Whole plant",
    activeCompounds: "Saponins, Alkaloids",
    therapeuticProp: "Anti-inflammatory, Diuretic, Wound healing",
    dosageForm: "Powder, Decoction",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/chirchita.glb",
    ayushApp: {
      ayurveda: "Used for urinary and skin disorders.",
      unani: "Used as diuretic.",
      siddha: "Used for wound healing.",
    },
    benefits: {
      a: "Supports urinary health.",
      b: "Reduces swelling.",
      c: "Heals wounds.",
      d: "Detoxifies body.",
    },
    family: "Amaranthaceae",
    genus: "Achyranthes",
    size: "1 meter",
    voiceDesc:
      "Chirchita, also known as Apamarga, is a hardy medicinal herb commonly found growing wild across India. It is used for detoxification, urinary issues, and wound healing. Traditional remedies use its whole plant to reduce inflammation and support overall cleansing of the body.",
  },

  {
    plantName: "Elaychi",
    plantSize: "Perennial herb up to 2–4 meters",
    image:
      "https://5.imimg.com/data5/OU/YV/MY-35232146/cardamom-plant-1000x1000.jpg",
    nativeRegion: "Kerala, Karnataka, Western Ghats",
    preferredClimate: "Humid tropical climate",
    reqSunlight: "Partial shade",
    reqSoil: "Rich loamy soil",
    partMedicine: "Seeds",
    activeCompounds: "Cineole, Terpinyl acetate",
    therapeuticProp: "Digestive, Carminative, Antioxidant",
    dosageForm: "Powder, Tea, Spice",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/elaychi.glb",
    ayushApp: {
      ayurveda: "Used for digestion and breath freshening.",
      unani: "Used for stomach problems.",
      siddha: "Used for respiratory relief.",
    },
    benefits: {
      a: "Improves digestion.",
      b: "Freshens breath.",
      c: "Relieves bloating.",
      d: "Supports respiratory health.",
    },
    family: "Zingiberaceae",
    genus: "Elettaria",
    size: "4 meters",
    voiceDesc:
      "Elaychi, or Cardamom, is an aromatic spice widely grown in the Western Ghats of India. It is valued for improving digestion, relieving gas and bloating, and freshening breath. Its pleasant aroma and medicinal properties make it a common ingredient in both food and herbal remedies.",
  },

  {
    plantName: "Ginger",
    plantSize: "Herb growing up to 1 meter",
    image:
      "https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/shutterstock_1315047329.jpg?itok=ksKXl8wg",
    nativeRegion: "Kerala, Karnataka, North-East India",
    preferredClimate: "Warm humid climate",
    reqSunlight: "Partial shade",
    reqSoil: "Rich well-drained soil",
    partMedicine: "Rhizome",
    activeCompounds: "Gingerol, Shogaol",
    therapeuticProp: "Anti-inflammatory, Digestive, Anti-nausea",
    dosageForm: "Tea, Powder, Juice",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/ginger.glb",
    ayushApp: {
      ayurveda: "Used for digestion and cold relief.",
      unani: "Used as warming tonic.",
      siddha: "Used for cough and nausea.",
    },
    benefits: {
      a: "Improves digestion.",
      b: "Relieves nausea.",
      c: "Reduces cold symptoms.",
      d: "Boosts metabolism.",
    },
    family: "Zingiberaceae",
    genus: "Zingiber",
    size: "1 meter",
    voiceDesc:
      "Ginger is a widely used medicinal rhizome known for its warming and digestive properties. It helps relieve nausea, indigestion, and cold symptoms while improving metabolism. It is commonly consumed as tea or added to food for both flavor and health benefits.",
  },

  {
    plantName: "Giloy",
    plantSize: "Climbing shrub with long stems",
    image:
      "https://dukaan.b-cdn.net/2000x2000/webp/upload_file_service/2b609031-e93d-4075-90c4-98ed1485c31c/herbal-medicinal-plant-onlineplantscart-in.png",
    nativeRegion: "Indian Subcontinent",
    preferredClimate: "Tropical climate",
    reqSunlight: "Full sun to partial shade",
    reqSoil: "Well-drained loamy soil",
    partMedicine: "Stem",
    activeCompounds: "Tinosporine, Berberine",
    therapeuticProp: "Immunomodulatory, Antipyretic, Anti-inflammatory",
    dosageForm: "Juice, Decoction, Tablets",
    glb3D: "supabase/plants/3d/giloy.glb",
    ayushApp: {
      ayurveda: "Used for fever, immunity, and digestion.",
      unani: "Used to treat chronic fever.",
      siddha: "Used for general vitality.",
    },
    benefits: {
      a: "Boosts immunity.",
      b: "Helps fight infections.",
      c: "Improves digestion.",
      d: "Reduces fever.",
    },
    family: "Menispermaceae",
    genus: "Tinospora",
    size: "Climber",
    voiceDesc:
      "Giloy, often called the 'Amrita' or root of immortality, is a climbing medicinal plant widely found across India. It is highly valued for boosting immunity, reducing fever, and supporting digestion. The stem extract helps fight infections, detoxify the body, and improve overall vitality, making it a common remedy during seasonal illnesses.",
  },

  {
    plantName: "Gudmar",
    plantSize: "Woody climbing vine",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gymnema_sylvestre_R.Br_-_Flickr_-_lalithamba.jpg",
    nativeRegion:
      "Western Ghats of Maharashtra, Karnataka, and Central India forests",
    preferredClimate: "Warm forest climate",
    reqSunlight: "Partial sun",
    reqSoil: "Well-drained forest soil",
    partMedicine: "Leaves",
    activeCompounds: "Gymnemic acids, Saponins",
    therapeuticProp: "Antidiabetic, Anti-inflammatory, Metabolic regulator",
    dosageForm: "Powder, Capsules, Tea",
    glb3D: "supabase/plants/3d/gudmar.glb",
    ayushApp: {
      ayurveda: "Used for diabetes management.",
      unani: "Used for sugar control.",
      siddha: "Used for metabolic balance.",
    },
    benefits: {
      a: "Reduces sugar cravings.",
      b: "Helps control blood glucose.",
      c: "Supports metabolism.",
      d: "Promotes weight balance.",
    },
    family: "Apocynaceae",
    genus: "Gymnema",
    size: "Climber",
    voiceDesc:
      "Gudmar, popularly known as the sugar destroyer, is a climbing herb native to the Western Ghats of Maharashtra. Its leaves help regulate blood sugar levels and reduce sugar cravings naturally. It is widely used in Ayurvedic formulations for diabetes management and maintaining healthy metabolism.",
  },

  {
    plantName: "Jatamansi",
    plantSize: "Small herb up to 60 cm",
    image:
      "https://www.picturethisai.com/image-handle/website_cmsname/image/1080/152499196207824900.jpeg?x-oss-process=image/format,webp&v=1.0",
    nativeRegion: "Himalayan regions of Uttarakhand, Himachal Pradesh, Sikkim",
    preferredClimate: "Cool mountainous climate",
    reqSunlight: "Partial shade",
    reqSoil: "Rocky well-drained soil",
    partMedicine: "Roots",
    activeCompounds: "Jatamansone, Valeranone",
    therapeuticProp: "Calming, Neuroprotective, Anti-anxiety",
    dosageForm: "Powder, Oil, Capsules",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/jatamansi.glb",
    ayushApp: {
      ayurveda: "Used for insomnia and stress.",
      unani: "Used for nervous disorders.",
      siddha: "Used for calming effects.",
    },
    benefits: {
      a: "Improves sleep.",
      b: "Reduces stress.",
      c: "Calms mind.",
      d: "Supports brain health.",
    },
    family: "Caprifoliaceae",
    genus: "Nardostachys",
    size: "60 cm",
    voiceDesc:
      "Jatamansi is a Himalayan medicinal herb valued for its calming and stress-relieving properties. It is traditionally used to improve sleep, reduce anxiety, and support mental balance. The aromatic roots are often prepared as powders or oils for nervous system support.",
  },

  {
    plantName: "Kalmegh",
    plantSize: "Herb up to 1 meter",
    image:
      "https://cnseed.org/wp-content/uploads/Andrographis%20paniculata%20seeds%20Kalmegh%20seeds.jpeg",
    nativeRegion: "Across India including plains and forests",
    preferredClimate: "Tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Well-drained soil",
    partMedicine: "Leaves",
    activeCompounds: "Andrographolide",
    therapeuticProp: "Hepatoprotective, Antipyretic, Immunomodulatory",
    dosageForm: "Juice, Tablets, Powder",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/kalmegh.glb",
    ayushApp: {
      ayurveda: "Used for fever and liver health.",
      unani: "Used for infections.",
      siddha: "Used for detoxification.",
    },
    benefits: {
      a: "Supports liver health.",
      b: "Reduces fever.",
      c: "Boosts immunity.",
      d: "Detoxifies body.",
    },
    family: "Acanthaceae",
    genus: "Andrographis",
    size: "1 meter",
    voiceDesc:
      "Kalmegh, often called the king of bitters, is widely used for liver protection and fever management. It helps detoxify the body, improve immunity, and fight infections. Its strong bitter taste reflects its powerful cleansing and healing properties.",
  },

  {
    plantName: "Meethavish",
    plantSize: "Marshy herb growing up to 1–1.5 meters",
    image: "https://www.dabur.com/Medical%20Plants/Meethavish%20Plant_0.jpg",
    nativeRegion:
      "Uttarakhand, Himachal Pradesh, Assam, wetlands of North and North-East India",
    preferredClimate: "Wet tropical and subtropical climate",
    reqSunlight: "Partial sun",
    reqSoil: "Moist marshy soil",
    partMedicine: "Rhizome",
    activeCompounds: "Beta-asarone, Acorin, Eugenol",
    therapeuticProp: "Memory enhancing, Digestive, Expectorant, Nervine tonic",
    dosageForm: "Powder, Decoction, Oil",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/meethavish.glb",
    ayushApp: {
      ayurveda: "Used for speech disorders, memory, and digestion.",
      unani: "Used for stomach and nerve problems.",
      siddha: "Used for respiratory issues.",
    },
    benefits: {
      a: "Improves memory and focus.",
      b: "Enhances digestion.",
      c: "Clears mucus.",
      d: "Supports nervous system.",
    },
    family: "Acoraceae",
    genus: "Acorus",
    size: "1.5 meters",
    voiceDesc:
      "Meethavish, also known as Vacha or Sweet Flag, is a marshy medicinal herb valued for improving memory, speech clarity, and digestion. Its aromatic rhizome acts as a brain tonic and expectorant, helping clear respiratory congestion while supporting the nervous system and mental alertness.",
  },

  {
    plantName: "Mulethi",
    plantSize: "Perennial herb up to 1 meter",
    image:
      "https://nurserynisarga.in/wp-content/uploads/2020/06/astragalus-glycophyllos-846682_640.jpg",
    nativeRegion: "Cultivated in Maharashtra, Punjab, and North-West India",
    preferredClimate: "Warm subtropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Loamy, well-drained soil",
    partMedicine: "Roots",
    activeCompounds: "Glycyrrhizin, Liquiritin, Flavonoids",
    therapeuticProp: "Expectorant, Anti-ulcer, Anti-inflammatory",
    dosageForm: "Powder, Decoction, Syrup",
    glb3D: "supabase/plants/3d/mulethi.glb",
    ayushApp: {
      ayurveda: "Used for cough, sore throat, and gastric ulcers.",
      unani: "Used as soothing tonic.",
      siddha: "Used for respiratory relief.",
    },
    benefits: {
      a: "Soothes throat.",
      b: "Relieves cough.",
      c: "Supports digestion.",
      d: "Reduces acidity.",
    },
    family: "Fabaceae",
    genus: "Glycyrrhiza",
    size: "1 meter",
    voiceDesc:
      "Mulethi, also called Licorice or Yashtimadhu, is a sweet medicinal root widely cultivated and used across India. It acts as a natural throat soother and is commonly used in cough syrups and herbal teas. It also supports digestion, reduces acidity, and promotes respiratory health, making it a versatile herb in traditional medicine.",
  },

  {
    plantName: "Nagarmotha",
    plantSize: "Grass-like plant up to 1 meter",
    image:
      "https://cdn.shopify.com/s/files/1/0252/0904/5067/files/Zanducare_Nagarmotha_1_600x600.png?v=1702456841",
    nativeRegion: "Across India including wetlands and fields",
    preferredClimate: "Warm climate",
    reqSunlight: "Full sun",
    reqSoil: "Moist sandy soil",
    partMedicine: "Rhizome",
    activeCompounds: "Cyperene, Cyperol",
    therapeuticProp: "Digestive, Anti-inflammatory, Antipyretic",
    dosageForm: "Powder, Decoction",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/nagarmotha.glb",
    ayushApp: {
      ayurveda: "Used for digestion and fever.",
      unani: "Used for stomach disorders.",
      siddha: "Used for detoxification.",
    },
    benefits: {
      a: "Improves digestion.",
      b: "Reduces fever.",
      c: "Relieves pain.",
      d: "Balances metabolism.",
    },
    family: "Cyperaceae",
    genus: "Cyperus",
    size: "1 meter",
    voiceDesc:
      "Nagarmotha is a traditional medicinal grass whose rhizomes are used to treat digestive problems and fever. It helps reduce inflammation, improve metabolism, and detoxify the body. It is commonly used in Ayurvedic formulations for gut and liver health.",
  },

  {
    plantName: "Neem",
    plantSize: "Grows up to 15–20 meters in height",
    image:
      "https://lalitenterprise.com/cdn/shop/files/Neem_Plant.webp?v=1751474259&width=713",
    nativeRegion: "Indian Subcontinent",
    preferredClimate: "Tropical and semi-tropical regions",
    reqSunlight: "Full sunlight",
    reqSoil: "Well-drained sandy or loamy soil",
    partMedicine: "Leaves, Bark, Seeds",
    activeCompounds: "Azadirachtin, Nimbin, Nimbidin",
    therapeuticProp: "Antibacterial, Antifungal, Anti-inflammatory",
    dosageForm: "Powder, Oil, Decoction",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/neem.glb",
    ayushApp: {
      ayurveda: "Used for skin diseases, blood purification, and diabetes.",
      unani: "Used as antiseptic and anti-parasitic.",
      siddha: "Used for detoxification and skin care.",
    },
    benefits: {
      a: "Purifies blood.",
      b: "Improves skin health.",
      c: "Controls bacterial infections.",
      d: "Supports oral hygiene.",
    },
    family: "Meliaceae",
    genus: "Azadirachta",
    size: "20 meters",
    voiceDesc:
      "Neem is a large evergreen medicinal tree commonly grown throughout India and is known as nature’s pharmacy. Its leaves, bark, and seeds possess strong antibacterial, antifungal, and detoxifying properties. It is traditionally used for skin disorders, blood purification, dental care, and protection against infections, making it one of the most trusted herbs in Ayurvedic medicine.",
  },

  {
    plantName: "Palasha",
    plantSize: "Medium tree up to 12–15 meters",
    image:
      "https://growbilliontrees.com/cdn/shop/articles/palash-tree-grow-billion-tree.jpg?v=1712727361&width=1500",
    nativeRegion: "Central and North India including Maharashtra, MP, UP",
    preferredClimate: "Dry tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Sandy or dry soil",
    partMedicine: "Flowers, Bark, Seeds",
    activeCompounds: "Butrin, Palasitrin",
    therapeuticProp: "Anti-inflammatory, Anthelmintic, Astringent",
    dosageForm: "Powder, Decoction",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/palasha.glb",
    ayushApp: {
      ayurveda: "Used for intestinal worms and skin issues.",
      unani: "Used for inflammation.",
      siddha: "Used for wound care.",
    },
    benefits: {
      a: "Kills intestinal worms.",
      b: "Improves skin health.",
      c: "Reduces swelling.",
      d: "Supports digestion.",
    },
    family: "Fabaceae",
    genus: "Butea",
    size: "15 meters",
    voiceDesc:
      "Palasha, also called Flame of the Forest, is known for its bright orange flowers and strong medicinal value. It helps remove intestinal worms, improves skin health, and reduces inflammation. Various parts of the tree are widely used in traditional detoxifying remedies.",
  },

  {
    plantName: "Punarnava",
    plantSize: "Spreading herb up to 60 cm",
    image: "https://gachwala.in/wp-content/uploads/2023/02/51UTT0SOTyL.jpg",
    nativeRegion: "Across India including plains and fields",
    preferredClimate: "Tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Well-drained soil",
    partMedicine: "Roots, Leaves",
    activeCompounds: "Boeravinone, Punarnavine",
    therapeuticProp: "Diuretic, Anti-inflammatory, Kidney tonic",
    dosageForm: "Juice, Powder, Tablets",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/punarnava.glb",
    ayushApp: {
      ayurveda: "Used for kidney and liver disorders.",
      unani: "Used for swelling.",
      siddha: "Used for detoxification.",
    },
    benefits: {
      a: "Supports kidney function.",
      b: "Reduces swelling.",
      c: "Improves liver health.",
      d: "Detoxifies body.",
    },
    family: "Nyctaginaceae",
    genus: "Boerhavia",
    size: "60 cm",
    voiceDesc:
      "Punarnava means 'renew again' and is valued for rejuvenating the body. It supports kidney and liver health, reduces water retention, and detoxifies the system. It is widely used to treat swelling, urinary issues, and chronic fatigue.",
  },

  {
    plantName: "Shalparni",
    plantSize: "Small shrub up to 1 meter",
    image: "https://anantamayurveda.com/wp-content/uploads/2023/08/4-31.jpg",
    nativeRegion: "Central and South India",
    preferredClimate: "Warm tropical climate",
    reqSunlight: "Full sun",
    reqSoil: "Sandy soil",
    partMedicine: "Roots",
    activeCompounds: "Flavonoids, Alkaloids",
    therapeuticProp: "Rejuvenating, Anti-inflammatory, Strengthening",
    dosageForm: "Decoction, Powder",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/shalparni.glb",
    ayushApp: {
      ayurveda: "Used in Dashmool formulations for strength.",
      unani: "Used for weakness.",
      siddha: "Used for vitality.",
    },
    benefits: {
      a: "Improves stamina.",
      b: "Reduces inflammation.",
      c: "Strengthens body.",
      d: "Supports recovery.",
    },
    family: "Fabaceae",
    genus: "Desmodium",
    size: "1 meter",
    voiceDesc:
      "Shalparni is an important herb included in the classical Dashmool formulation. It is used to enhance strength, reduce inflammation, and help the body recover from weakness. It supports immunity and overall vitality.",
  },

  {
    plantName: "Shankhpushpi",
    plantSize: "Low spreading herb up to 30–40 cm",
    image:
      "https://image.myupchar.com/681/webp/shankhpushpi-ke-fayde-aur-nuksan-in-hindi-1.webp",
    nativeRegion: "Maharashtra, Rajasthan, and dry plains across India",
    preferredClimate: "Warm dry climate",
    reqSunlight: "Full sun",
    reqSoil: "Sandy or light soil",
    partMedicine: "Whole plant",
    activeCompounds: "Alkaloids, Flavonoids, Coumarins",
    therapeuticProp: "Memory enhancer, Anti-anxiety, Neuroprotective",
    dosageForm: "Syrup, Powder, Capsules",
    glb3D: "supabase/plants/3d/shankhpushpi.glb",
    ayushApp: {
      ayurveda: "Used for memory and concentration.",
      unani: "Used as brain tonic.",
      siddha: "Used for mental calmness.",
    },
    benefits: {
      a: "Improves memory.",
      b: "Reduces stress.",
      c: "Enhances concentration.",
      d: "Supports nervous system.",
    },
    family: "Convolvulaceae",
    genus: "Convolvulus",
    size: "40 cm",
    voiceDesc:
      "Shankhpushpi is a small creeping herb widely used as a natural brain tonic in Ayurveda. It helps improve memory, concentration, and learning ability while reducing stress and anxiety. Students and elderly people commonly consume it in syrup form to support mental clarity and overall cognitive health.",
  },

  {
    plantName: "Shatavari",
    plantSize: "Climbing plant up to 2 meters",
    image:
      "https://strictlymedicinalseeds.com/wp-content/uploads/2018/03/Asparagus_ramosus_shatavari-1.jpg",
    nativeRegion: "Across India including Rajasthan, MP, Maharashtra",
    preferredClimate: "Dry subtropical climate",
    reqSunlight: "Partial sun",
    reqSoil: "Sandy soil",
    partMedicine: "Roots",
    activeCompounds: "Shatavarins",
    therapeuticProp: "Reproductive tonic, Adaptogenic, Cooling",
    dosageForm: "Powder, Syrup, Capsules",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/shatavari.glb",
    ayushApp: {
      ayurveda: "Used for women's health.",
      unani: "Used as tonic.",
      siddha: "Used for hormonal balance.",
    },
    benefits: {
      a: "Supports hormonal balance.",
      b: "Improves fertility.",
      c: "Boosts immunity.",
      d: "Reduces stress.",
    },
    family: "Asparagaceae",
    genus: "Asparagus",
    size: "2 meters",
    voiceDesc:
      "Shatavari is a well-known rejuvenating herb particularly beneficial for women's health. It supports hormonal balance, improves fertility, and strengthens immunity. Its cooling and nourishing properties promote overall wellness and vitality.",
  },

  {
    plantName: "Tamalpatra",
    plantSize: "Tree up to 10–15 meters",
    image:
      "https://cdn-image.blitzshopdeck.in/ShopdeckCatalogue/tr:f-webp,w-600,fo-auto/660fbce402d8dc3ec1dbbc5a/media/Haping_Tej_Patta_276_1714373405663_hfk6djhex7mqqv7.jpg",
    nativeRegion: "Himalayan regions and North-East India",
    preferredClimate: "Cool subtropical climate",
    reqSunlight: "Partial sun",
    reqSoil: "Moist soil",
    partMedicine: "Leaves",
    activeCompounds: "Cineole, Eugenol",
    therapeuticProp: "Digestive, Aromatic, Carminative",
    dosageForm: "Powder, Spice, Tea",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/tamalpatra.glb",
    ayushApp: {
      ayurveda: "Used for digestion.",
      unani: "Used as aromatic stimulant.",
      siddha: "Used for respiratory relief.",
    },
    benefits: {
      a: "Improves digestion.",
      b: "Relieves gas.",
      c: "Enhances flavor.",
      d: "Supports respiratory health.",
    },
    family: "Lauraceae",
    genus: "Cinnamomum",
    size: "15 meters",
    voiceDesc:
      "Tamalpatra, commonly known as Indian bay leaf, is both a culinary spice and medicinal herb. It improves digestion, reduces bloating, and enhances respiratory health. Its aromatic leaves are widely used in food and traditional remedies.",
  },

  {
    plantName: "Turmeric",
    plantSize: "Herb up to 1 meter",
    image:
      "https://homegrownhandgathered.com/wp-content/uploads/2023/08/IMG_3153-1536x1152.jpg",
    nativeRegion: "India, especially Maharashtra, Telangana, Tamil Nadu",
    preferredClimate: "Warm humid climate",
    reqSunlight: "Partial sun",
    reqSoil: "Rich loamy soil",
    partMedicine: "Rhizome",
    activeCompounds: "Curcumin",
    therapeuticProp: "Anti-inflammatory, Antioxidant, Antiseptic",
    dosageForm: "Powder, Milk, Capsules",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/turmeric.glb",
    ayushApp: {
      ayurveda: "Used for wounds and immunity.",
      unani: "Used for inflammation.",
      siddha: "Used for skin care.",
    },
    benefits: {
      a: "Reduces inflammation.",
      b: "Boosts immunity.",
      c: "Heals wounds.",
      d: "Improves skin.",
    },
    family: "Zingiberaceae",
    genus: "Curcuma",
    size: "1 meter",
    voiceDesc:
      "Turmeric, also called Haldi, is one of the most powerful natural anti-inflammatory herbs. It supports immunity, heals wounds, and improves skin health. It is widely used in daily cooking and traditional medicinal preparations.",
  },

  {
    plantName: "Vajradanti",
    plantSize: "Shrubby herb growing up to 1–1.5 meters",
    image: "https://www.auromere.com/images/Barleria-prionitis.jpg",
    nativeRegion:
      "Maharashtra, Gujarat, Rajasthan, and dry plains of Central India",
    preferredClimate: "Dry tropical climate",
    reqSunlight: "Full sunlight",
    reqSoil: "Sandy or well-drained soil",
    partMedicine: "Leaves, Roots",
    activeCompounds: "Iridoid glycosides, Flavonoids, Tannins",
    therapeuticProp: "Antibacterial, Anti-inflammatory, Astringent",
    dosageForm: "Powder, Paste, Tooth powder",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/vajradanti.glb",
    ayushApp: {
      ayurveda: "Used for dental and gum disorders.",
      unani: "Used for oral infections.",
      siddha: "Used for strengthening teeth.",
    },
    benefits: {
      a: "Strengthens gums.",
      b: "Prevents tooth decay.",
      c: "Reduces mouth infections.",
      d: "Improves oral hygiene.",
    },
    family: "Acanthaceae",
    genus: "Barleria",
    size: "1.5 meters",
    voiceDesc:
      "Vajradanti is a traditional medicinal shrub widely found in Maharashtra and dry regions of India. It is famous for its strong dental benefits and is commonly used in herbal tooth powders. The leaves and roots help strengthen gums, prevent infections, and maintain overall oral hygiene, making it a natural alternative to chemical toothpaste.",
  },
  {
    plantName: "Vidhadaru",
    plantSize: "Large woody climber",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Argyreia_speciosa_flower.jpg",
    nativeRegion: "India, Sri Lanka, tropical regions of Asia",
    preferredClimate: "Tropical and subtropical climate",
    reqSunlight: "Full sun to partial shade",
    reqSoil: "Well-drained loamy soil",
    partMedicine: "Roots, Leaves, Seeds",
    activeCompounds: "Alkaloids, Flavonoids, Tannins, Steroids",
    therapeuticProp:
      "Rejuvenative, Nervine tonic, Anti-inflammatory, Aphrodisiac",
    dosageForm: "Powder, Decoction, Paste",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/vidhadaru.glb",
    ayushApp: {
      ayurveda:
        "Used as a Rasayana for nervous weakness, infertility, and inflammation.",
      unani: "Used for strengthening nerves and improving vitality.",
      siddha: "Used for rejuvenation and musculoskeletal disorders.",
    },
    benefits: {
      a: "Strengthens nervous system.",
      b: "Improves male fertility.",
      c: "Reduces joint pain and inflammation.",
      d: "Acts as rejuvenative tonic.",
    },
    family: "Convolvulaceae",
    genus: "Argyreia",
    size: "Climber spreading several meters",
    voiceDesc:
      "Vidhadaru, also known as Argyreia speciosa, is a powerful rejuvenating climber used in traditional Ayurvedic medicine. Its roots are valued for strengthening the nervous system, improving vitality, supporting reproductive health, and reducing inflammation. It is commonly prescribed as a Rasayana for overall wellness and longevity.",
  },
  {
    plantName: "Yavasa",
    plantSize: "Shrub up to 1 meter",
    image: "https://static.inaturalist.org/photos/152310031/medium.jpg",
    nativeRegion: "Rajasthan, Gujarat, dry regions of India",
    preferredClimate: "Dry desert climate",
    reqSunlight: "Full sun",
    reqSoil: "Sandy soil",
    partMedicine: "Whole plant",
    activeCompounds: "Flavonoids, Saponins",
    therapeuticProp: "Expectorant, Anti-inflammatory, Diuretic",
    dosageForm: "Powder, Decoction",
    glb3D:
      "https://cbegqyagrayedokkolqe.supabase.co/storage/v1/object/public/models/yavasa.glb",
    ayushApp: {
      ayurveda: "Used for cough and urinary issues.",
      unani: "Used for fever.",
      siddha: "Used for detoxification.",
    },
    benefits: {
      a: "Clears cough.",
      b: "Supports urinary health.",
      c: "Reduces fever.",
      d: "Detoxifies body.",
    },
    family: "Fabaceae",
    genus: "Alhagi",
    size: "1 meter",
    voiceDesc:
      "Yavasa is a hardy desert shrub traditionally used to relieve cough, urinary problems, and inflammation. It helps clear mucus, detoxify the body, and maintain respiratory and kidney health, especially useful in dry climatic regions.",
  },
];

module.exports = { data: samplePlants };
