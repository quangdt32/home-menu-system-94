
# HTML Templates cho ASP.NET MVC

Đây là các file HTML tĩnh được tạo ra từ ứng dụng React, có thể sử dụng làm reference cho việc phát triển ứng dụng ASP.NET MVC.

## Cấu trúc Files

### 1. login.html
- Trang đăng nhập với Bootstrap styling
- Form validation JavaScript
- Responsive design
- Có thể chuyển đổi thành Razor View (.cshtml)

### 2. dashboard.html
- Trang dashboard với sidebar navigation
- Multiple content sections
- Bootstrap components
- JavaScript cho navigation và logout

## Cách sử dụng trong ASP.NET MVC

### 1. Chuyển đổi thành Razor Views

#### Views/Account/Login.cshtml
```html
@{
    ViewData["Title"] = "Đăng nhập";
}

<!-- Copy nội dung từ login.html và chỉnh sửa form action -->
@using (Html.BeginForm("Login", "Account", FormMethod.Post))
{
    <!-- Form fields từ login.html -->
}
```

#### Views/Home/Dashboard.cshtml
```html
@{
    ViewData["Title"] = "Dashboard";
}

<!-- Copy nội dung từ dashboard.html -->
<!-- Thay thế JavaScript bằng Razor syntax cho data -->
```

### 2. CSS Classes sử dụng

#### Bootstrap 5 Classes:
- `container-fluid` - Full width container
- `card`, `card-header`, `card-body` - Card components
- `btn btn-primary` - Primary buttons
- `table table-hover` - Hover effect tables
- `nav nav-link` - Navigation links
- `badge bg-success` - Status badges

#### Custom CSS Classes:
- `.login-container` - Login page wrapper
- `.sidebar` - Sidebar navigation
- `.main-content` - Main content area
- `.content-card` - Content cards

### 3. JavaScript Functionality

#### Có thể chuyển đổi thành:
- Server-side validation (ModelState)
- AJAX calls cho dynamic content
- ASP.NET Core SignalR cho real-time updates

### 4. Routing Structure

```csharp
// Controllers/AccountController.cs
public class AccountController : Controller
{
    public IActionResult Login() => View();
    
    [HttpPost]
    public IActionResult Login(LoginViewModel model)
    {
        // Login logic
    }
}

// Controllers/HomeController.cs  
public class HomeController : Controller
{
    public IActionResult Dashboard() => View();
    
    public IActionResult Users() => View();
    
    public IActionResult Categories() => View();
}
```

### 5. Models cần tạo

```csharp
public class LoginViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    public string Password { get; set; }
}

public class UserViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
}
```

## Lưu ý quan trọng

1. **Authentication**: Thay thế localStorage bằng ASP.NET Identity
2. **Validation**: Sử dụng ModelState thay vì client-side validation
3. **Data**: Kết nối với Entity Framework thay vì mock data
4. **Security**: Implement CSRF protection và proper authorization
5. **Responsive**: Đã được tối ưu cho mobile với Bootstrap responsive classes

## Dependencies cần cài đặt

```xml
<!-- Trong project MVC -->
<PackageReference Include="Microsoft.AspNetCore.Identity" />
<PackageReference Include="Microsoft.EntityFrameworkCore" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" />
```

## CDN Resources đã sử dụng

- Bootstrap 5.3.0 CSS & JS
- Font Awesome 6.0.0 Icons
- Có thể download về local hoặc sử dụng CDN
