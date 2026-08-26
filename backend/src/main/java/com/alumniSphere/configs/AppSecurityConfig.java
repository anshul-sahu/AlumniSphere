package com.alumniSphere.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import com.alumniSphere.services.AuthServices;
import com.alumniSphere.filters.AppFilter;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig {
	
	@Autowired
	private AppFilter appFilter;
	
	@Autowired
	private AuthServices authServ;
	
	@Bean
	public PasswordEncoder passwEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProv = new DaoAuthenticationProvider(authServ);
		authProv.setPasswordEncoder(passwEncoder());
		return authProv;
	}
	
	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration conf) {
		return conf.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain configSecurity(HttpSecurity httpSec, CorsConfigurationSource corsConfigurationSource) throws Exception {
	    return httpSec.csrf(csrf -> csrf.disable())
	             .cors(cors -> cors.configurationSource(corsConfigurationSource))
	            .authorizeHttpRequests(req -> req
	                    .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
	                    .requestMatchers("/signIn", "/signUp", "/logout", "/save_student/{userId}","/collect_all_department",
	                    		"/alumniProfile/{userId}").permitAll()
	                    .anyRequest().authenticated()
	                    )
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authenticationProvider(authProvider()).addFilterBefore(appFilter, UsernamePasswordAuthenticationFilter.class).build();
	}
}
