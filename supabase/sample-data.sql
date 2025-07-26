-- ===================================================================
-- SAMPLE DATA FOR SMTOWN LOCAL MARKETPLACE
-- Location: Ngọc Hồi, Kon Tum
-- ===================================================================

-- Insert sample categories (Vietnamese marketplace context)
INSERT INTO public.categories (name, name_vietnamese, description, sort_order) VALUES
('electronics', 'Điện tử', 'Thiết bị điện tử, điện thoại, máy tính', 1),
('vehicles', 'Xe cộ', 'Xe máy, xe đạp, ô tô', 2),
('home-garden', 'Nhà cửa & Vườn', 'Đồ nội thất, cây cảnh, dụng cụ nhà bếp', 3),
('fashion', 'Thời trang', 'Quần áo, giày dép, phụ kiện', 4),
('books-media', 'Sách & Giải trí', 'Sách, CD, DVD, đồ chơi', 5),
('sports', 'Thể thao', 'Đồ thể thao, dụng cụ tập luyện', 6),
('food-drink', 'Thực phẩm', 'Thức ăn, đồ uống, đặc sản địa phương', 7),
('services', 'Dịch vụ', 'Sửa chữa, dạy học, vận chuyển', 8),
('agriculture', 'Nông sản', 'Nông sản, hoa quả, rau củ', 9),
('free-items', 'Đồ miễn phí', 'Tặng đồ, trao đổi không mất tiền', 10);

-- Note: Sample user profiles and posts would be inserted after actual users register
-- The following are template examples for reference:

/*
-- Sample user profile (after auth.users exists)
INSERT INTO public.user_profiles (
    user_id, 
    full_name, 
    phone_number, 
    address, 
    ward, 
    bio
) VALUES (
    'user-uuid-here',
    'Nguyễn Văn Nam',
    '0987654321',
    '123 Đường Nguyễn Tất Thành',
    'Phường Quyết Thắng',
    'Bán đồ điện tử chính hãng, uy tín tại Ngọc Hồi'
);

-- Sample post
INSERT INTO public.posts (
    user_id,
    category_id,
    title,
    description,
    price,
    condition,
    post_type,
    location_detail,
    ward
) VALUES (
    'user-uuid-here',
    (SELECT id FROM public.categories WHERE name = 'electronics'),
    'iPhone 12 Pro Max 128GB',
    'Điện thoại iPhone 12 Pro Max màu xanh dương, dung lượng 128GB. Máy còn mới 95%, pin 89%, đầy đủ phụ kiện. Bảo hành chính hãng còn 6 tháng.',
    18500000,
    'like_new',
    'sell',
    'Gần chợ Quyết Thắng',
    'Phường Quyết Thắng'
);
*/
