package com.revature.happyfarmersmarket.interceptor;

import com.revature.happyfarmersmarket.model.JwtToken;
import com.revature.happyfarmersmarket.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
    private static final Logger logger = LogManager.getLogger();
    private static final AntPathMatcher pathMatcher = new AntPathMatcher();
    private static final Set<String> OPEN_ENDPOINTS;

    static {
        OPEN_ENDPOINTS = new HashSet<>();
        OPEN_ENDPOINTS.add("/api/v*/login");
        OPEN_ENDPOINTS.add("/api/v*/register");
        OPEN_ENDPOINTS.add("/api/v*/products");
        OPEN_ENDPOINTS.add("/api/v*/security-questions");
        OPEN_ENDPOINTS.add("/api/v*/reset-password/**");
    }

    private final JwtService jwtService;

    @Autowired
    public AuthenticationInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("Received {} request at endpoint '{}'", request.getMethod(), request.getRequestURI());
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

            if (pathMatcher.match("/api/v*/admin/**", request.getRequestURI())) {
                boolean isUserAdmin = claims.get().get("role").equals("admin");
                if (isUserAdmin) return true;
                else {
                    response.sendError(403, "User does not have the required privileges.");
                    return false;
                }
            } else return true;
        } else response.sendError(401, "Invalid authorization token");
        return false;
    }
}
