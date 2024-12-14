package com.revature.happyfarmersmarket.configuration;

import com.revature.happyfarmersmarket.interceptor.AuthenticationInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ServerConfiguration implements WebMvcConfigurer {
    private final AuthenticationInterceptor authenticationInterceptor;

    @Value("${clientOrigin}")
    private String CLIENT_ORIGIN;

    @Autowired
    public ServerConfiguration(AuthenticationInterceptor authenticationInterceptor) {
        this.authenticationInterceptor = authenticationInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(this.authenticationInterceptor);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", CLIENT_ORIGIN)
                .allowedMethods("GET", "HEAD", "POST", "PUT");
    }
}
