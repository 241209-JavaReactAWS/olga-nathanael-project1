package com.revature.happyfarmersmarket.interceptor;

import com.revature.happyfarmersmarket.model.JwtToken;
import com.revature.happyfarmersmarket.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

// todo confirm login functionality

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
    private static final AntPathMatcher pathMatcher = new AntPathMatcher();
    private static final Set<String> OPEN_ENDPOINTS;

    static {
        OPEN_ENDPOINTS = new HashSet<>();
        OPEN_ENDPOINTS.add("/login");
        OPEN_ENDPOINTS.add("/register");
        OPEN_ENDPOINTS.add("/products");
    }

    private final JwtService jwtService;

    @Autowired
    public AuthenticationInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getMethod().equals("OPTIONS")) return true;
        if (OPEN_ENDPOINTS.stream().anyMatch((path) -> pathMatcher.match(path, request.getRequestURI()))) return true;

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.sendError(401, "Invalid authorization header");
            return false;
        }

        JwtToken token = new JwtToken(authorizationHeader.substring("Bearer ".length()));
        Optional<Claims> claims = this.jwtService.verifyToken(token);
        if (claims.isPresent()) {
            request.setAttribute("authClaims", claims.get());
            if (pathMatcher.match("/admin/**", request.getRequestURI())) {
                return claims.get().get("role").equals("admin");
            }
            return true;
        } else response.sendError(401, "Invalid authorization token");
        return false;
    }
}
