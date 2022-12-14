package com.stackoverflow.backend.auth.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackoverflow.backend.auth.dto.Response;
import com.stackoverflow.backend.auth.model.Member;
import com.stackoverflow.backend.auth.oauth.PrincipalDetails;
import com.stackoverflow.backend.auth.repository.MemberRepository;
import com.stackoverflow.backend.exception.TokenNotFoundException;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private MemberRepository memberRepository;

    private final ObjectMapper objectMapper =new ObjectMapper();


    private final Logger log = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
try {    System.out.println("???????????? ????????? ????????? ?????? ?????? ???.");

    String jwtHeader = request.getHeader("Authorization");
    if (jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
        chain.doFilter(request, response);
        return;
    }
    String jwtToken = jwtHeader.replace("Bearer ", "");//?????? ?????????
    String email = JWT.require(Algorithm.HMAC512("cos_jwt_token")).build().verify(jwtToken).getClaim("email").asString();//email??? ????????? ????????? ??????

    if (email != null) {
        Member memberEntity = memberRepository.findByEmail(email);
        PrincipalDetails principalDetails = new PrincipalDetails(memberEntity);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
        //SecurityContextHolder ??? Authentication ??? ???????????? ????????? @PreAuthorize ??? ?????? ????????????
        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(request, response);
    } else {
        super.doFilterInternal(request, response, chain);
    }
    }catch (JWTDecodeException e) {
    sendErrorResponse(response, "????????? ???????????????");
    } catch (TokenExpiredException e) {
    sendErrorResponse(response, "????????? ???????????????");
    } catch (UnsupportedJwtException e) {
    sendErrorResponse(response, "???????????? ?????? ???????????????");
    } catch (SignatureVerificationException e) {
    sendErrorResponse(response, "???????????? ????????? ????????? ???????????????");
    } catch (Exception e) {
    sendErrorResponse(response, "??? ??? ?????? ???????????????");
    }


    }
    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(Response.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(message)
                .build()));
    }
}
