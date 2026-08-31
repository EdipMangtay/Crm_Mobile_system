-- ═══════════════════════════════════════════════════════════════
-- TRAVIA DUBAI — DEMO SEED DATA (PRD §58, §59, §60)
-- ═══════════════════════════════════════════════════════════════

-- 1. Create Company
INSERT INTO companies (id, name, slug, settings)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Travia Dubai',
  'travia-dubai',
  '{"currency": "AED", "timezone": "Asia/Dubai", "contact_phone": "+971 58 267 8228", "whatsapp": "+971582678228"}'
) ON CONFLICT DO NOTHING;

-- 2. Mock / Reference Profiles
-- Efza Yılmaz (Staff / Concierge)
INSERT INTO profiles (id, company_id, role, first_name, last_name, email, phone, whatsapp, country, preferred_language, is_active)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'concierge',
  'Efza',
  'Yılmaz',
  'efza@traviadubai.com',
  '+971 58 267 8228',
  '+971582678228',
  'AE',
  'tr',
  TRUE
) ON CONFLICT DO NOTHING;

-- Edip Mangtay (Customer Profile)
INSERT INTO profiles (id, company_id, role, first_name, last_name, email, phone, whatsapp, country, preferred_language, is_active)
VALUES (
  'c0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'customer',
  'Edip',
  'Mangtay',
  'edip.demo@travia.internal',
  '+90 532 000 0000',
  '+905320000000',
  'TR',
  'tr',
  TRUE
) ON CONFLICT DO NOTHING;

-- 3. Customer Record
INSERT INTO customers (id, company_id, profile_id, first_name, last_name, email, phone, whatsapp, country, preferred_language, notes, tags)
VALUES (
  'd0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'Edip',
  'Mangtay',
  'edip.demo@travia.internal',
  '+90 532 000 0000',
  '+905320000000',
  'TR',
  'tr',
  'VIP misafir, fine dining ve lüks yat deneyimlerine özel ilgi gösteriyor.',
  ARRAY['VIP', 'Couple', 'Booked', 'Luxury']
) ON CONFLICT DO NOTHING;

-- 4. Customer Access (PRD §58: edip.demo)
INSERT INTO customer_access (id, company_id, customer_id, auth_user_id, username, is_active, must_change_password)
VALUES (
  'e0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'c0000000-0000-0000-0000-000000000001',
  'edip.demo',
  TRUE,
  FALSE
) ON CONFLICT DO NOTHING;

-- 5. Trip Record (PRD §58: 12–17 Eylül, Atlantis The Royal, 18.500 AED)
INSERT INTO trips (
  id, company_id, customer_id, title, subtitle, destination,
  start_date, end_date, pax_count, pax_label, status,
  hotel_name, hotel_address, total_amount, currency
) VALUES (
  'f0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'Travia Dubai',
  'Premium Couple Experience',
  'Dubai',
  '2026-09-12',
  '2026-09-17',
  2,
  'Premium Couple',
  'upcoming',
  'Atlantis The Royal',
  'Crescent Rd, Palm Jumeirah, Dubai',
  18500.00,
  'AED'
) ON CONFLICT DO NOTHING;

-- 6. Itinerary Days (PRD §59)
INSERT INTO itinerary_days (id, trip_id, day_number, date, title) VALUES
  ('10000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 1, '2026-09-12', 'Dubai''ye Hoş Geldiniz'),
  ('10000000-0000-0000-0000-000000000002', 'f0000000-0000-0000-0000-000000000001', 2, '2026-09-13', 'VIP Şehir & Özel Yat Turu'),
  ('10000000-0000-0000-0000-000000000003', 'f0000000-0000-0000-0000-000000000001', 3, '2026-09-14', 'Kızıl Kum Tepeleri VIP Çöl Safarisi'),
  ('10000000-0000-0000-0000-000000000004', 'f0000000-0000-0000-0000-000000000001', 4, '2026-09-15', 'Abu Dhabi & Louvre Saray Keşfi'),
  ('10000000-0000-0000-0000-000000000005', 'f0000000-0000-0000-0000-000000000001', 5, '2026-09-16', 'Palm Jumeirah & Özel Beach Club'),
  ('10000000-0000-0000-0000-000000000006', 'f0000000-0000-0000-0000-000000000001', 6, '2026-09-17', 'Alışveriş & VIP Havalimanı Uğurlama')
ON CONFLICT DO NOTHING;

-- 7. Bookings & Itinerary Items
-- Day 1 Transfer Booking (PRD §16, §22)
INSERT INTO bookings (
  id, company_id, trip_id, customer_id, type, status,
  title, description, date, start_time, end_time,
  location, meeting_point, pax_count, dress_code,
  driver_name, driver_phone, driver_whatsapp, vehicle_type, vehicle_plate,
  pickup_location, dropoff_location
) VALUES (
  '20000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'f0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'transfer',
  'confirmed',
  'VIP Airport Chauffeur Transfer',
  'Havalimanı kapısında isminizle özel karşılama ve Atlantis The Royal otele lüks transfer.',
  '2026-09-12', '10:30', '11:45',
  'Dubai International Airport (DXB)', 'Terminal 3 VIP Çıkış Kapısı',
  2, 'Smart Casual',
  'Khalid Ahmed', '+971 50 123 4567', '+971501234567', 'Mercedes V-Class Luxury', 'Dubai X 78219',
  'Dubai International Airport T3', 'Atlantis The Royal, Palm Jumeirah'
) ON CONFLICT DO NOTHING;

-- Day 1 Items
INSERT INTO itinerary_items (itinerary_day_id, booking_id, sort_order, time, title, subtitle, location, icon, status, is_highlight) VALUES
  ('10000000-0000-0000-0000-000000000001', NULL, 1, '09:10', 'Dubai Havalimanı İniş', 'Uçuş: TK762', 'DXB Terminal 3', 'plane', 'confirmed', FALSE),
  ('10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 2, '10:30', 'VIP Havalimanı Transferi', 'Mercedes V-Class · Şoför Khalid Ahmed', 'DXB → Atlantis The Royal', 'car', 'confirmed', TRUE),
  ('10000000-0000-0000-0000-000000000001', NULL, 3, '12:00', 'Atlantis The Royal Check-in', 'Sky Pool Villa Giriş & Dinlenme', 'Palm Jumeirah', 'hotel', 'confirmed', FALSE),
  ('10000000-0000-0000-0000-000000000001', NULL, 4, '16:30', 'Dubai Mall & Burj Khalifa Seyri', 'Özel Lounge Geçişi', 'Downtown Dubai', 'map-pin', 'confirmed', FALSE),
  ('10000000-0000-0000-0000-000000000001', NULL, 5, '20:30', 'Zuma Dubai Akşam Yemeği', 'Fine-Dining Japon Gastronomisi (2 Kişi)', 'DIFC Gate Village', 'utensils', 'confirmed', TRUE)
ON CONFLICT DO NOTHING;

-- Day 2 Yacht Booking
INSERT INTO bookings (
  id, company_id, trip_id, customer_id, type, status,
  title, description, date, start_time, end_time,
  location, meeting_point, pax_count, dress_code
) VALUES (
  '20000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000001',
  'f0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'yacht',
  'confirmed',
  'Private Superyacht Sunset Cruise',
  'Dubai Marina ve Ain Dubai çevresinde şampanyalı ve özel ikramlı gün batımı yat seyri.',
  '2026-09-13', '14:00', '17:30',
  'Dubai Marina Yacht Club', 'Pier 7 VIP İskele',
  2, 'Resort Chic / Yacht Attire'
) ON CONFLICT DO NOTHING;

-- 8. Message Thread & Dialogue (PRD §60)
INSERT INTO message_threads (id, company_id, customer_id, trip_id, title, last_message_preview, customer_unread_count, staff_unread_count)
VALUES (
  '30000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'd0000000-0000-0000-0000-000000000001',
  'f0000000-0000-0000-0000-000000000001',
  'Travia Concierge',
  'Nobu Dubai için 20:30 rezervasyonunuzu onayladık.',
  0,
  0
) ON CONFLICT DO NOTHING;

INSERT INTO messages (id, thread_id, sender_id, sender_role, type, content, status) VALUES
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'customer', 'text', 'Bu akşam güzel bir steakhouse ayarlayabilir miyiz?', 'read'),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'concierge', 'text', 'Elbette Edip Bey. Size üç premium seçenek hazırlıyorum: Nusr-Et, Carna ve Nobu.', 'read'),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001', NULL, 'concierge', 'system', 'Yeni Talep Oluşturuldu: Fine Dining · Nobu Dubai (Bu Akşam 20:30)', 'read'),
  ('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'concierge', 'text', 'Nobu Dubai için 20:30 rezervasyonunuzu onayladık. Masanız terasta Burj Al Arab manzaralıdır.', 'read'),
  ('40000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000001', NULL, 'concierge', 'system', 'Rezervasyon Onaylandı: Nobu Dubai · 20:30', 'read')
ON CONFLICT DO NOTHING;

-- 9. Payments (PRD §33: Total: 18.500 AED, Paid: 5.000 AED, Remaining: 13.500 AED)
INSERT INTO payments (id, company_id, trip_id, customer_id, amount, currency, status, description, payment_method, paid_at) VALUES
  ('50000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 5000.00, 'AED', 'received', 'Paket Kaporası', 'Banka Havalesi', '2026-08-27 14:00:00+04'),
  ('50000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 13500.00, 'AED', 'pending', 'Kalan Paket Bakiyesi (Otelde Tahsilat)', 'Kredi Kartı / Nakit', NULL)
ON CONFLICT DO NOTHING;

-- 10. Documents (PRD §32)
INSERT INTO documents (id, company_id, customer_id, trip_id, type, title, file_url, file_name, file_size, mime_type, is_customer_visible) VALUES
  ('60000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 'hotel_voucher', 'Atlantis The Royal Konaklama Voucher', 'https://traviadubai.com/docs/voucher-atlantis.pdf', 'voucher-atlantis.pdf', 1240000, 'application/pdf', TRUE),
  ('60000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 'visa_document', 'Birleşik Arap Emirlikleri E-Vize Onay Belgesi', 'https://traviadubai.com/docs/uae-evisa-edip.pdf', 'uae-evisa-edip.pdf', 680000, 'application/pdf', TRUE),
  ('60000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000001', 'yacht_confirmation', 'Özel Yat Rezervasyon Konfirmasyonu', 'https://traviadubai.com/docs/yacht-booking-ref.pdf', 'yacht-booking-ref.pdf', 540000, 'application/pdf', TRUE)
ON CONFLICT DO NOTHING;

-- 11. Curated Experiences for Explore (PRD §29)
INSERT INTO experiences (id, company_id, category, title, description, cover_image_url, duration, highlights, is_active, sort_order) VALUES
  ('70000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'yacht', 'Private Superyacht Experience', 'Dubai Marina ve Palm Jumeirah lagününde şampanya eşliğinde gün batımı seyri.', 'https://traviadubai.com/images/luxury-yacht.jpg', '4 Saat', ARRAY['Özel Kaptan & Ekip', 'Şampanya & Meyve İkramı', 'Yüzme Molası'], TRUE, 1),
  ('70000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'desert_safari', 'VIP Red Dunes Safari & Majlis', 'Kızıl kum tepelerinde safari, gün batımı fotoğraf molası ve lüks Arap çadırında akşam yemeği.', 'https://traviadubai.com/images/desert-safari.jpg', '6 Saat', ARRAY['Özel VIP Majlis', 'Şahin Gösterisi', 'Barbekü & Gurme Menü'], TRUE, 2),
  ('70000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'helicopter', 'Helicopter City Skyline Tour', 'Burj Al Arab ve Palm Jumeirah üzerinden geçen nefes kesici helikopter turu.', 'https://traviadubai.com/images/hero-skyline.jpg', '22 Dakika', ARRAY['VIP Check-in', 'Panoramik Gökyüzü Manzarası', 'Özel Transfer'], TRUE, 3),
  ('70000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'transfer', '10 Saat Mercedes S-Class Şoförlü Tahsis', 'Kişisel Türkçe rehberiniz ve Mercedes S-Class aracınız tüm gün boyunca emrinizde.', 'https://traviadubai.com/images/vip-chauffeur.jpg', '10 Saat', ARRAY['Türkçe Profesyonel Rehber', 'Sınırsız Şehir İçi Kilometre', 'Esnek Rota'], TRUE, 4)
ON CONFLICT DO NOTHING;
