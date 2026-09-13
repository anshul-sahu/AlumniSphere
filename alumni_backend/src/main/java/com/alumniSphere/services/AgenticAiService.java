package com.alumniSphere.services;

import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

import com.alumniSphere.tools.InternshipApplyTool;

@Service
public class AgenticAiService {
	
	private ChatClient chatClient;
	private InternshipApplyTool internApplytool;
	
	public AgenticAiService(ChatClient.Builder builder, InternshipApplyTool internApplytool) {
		this.chatClient = builder.build();
		this.internApplytool = internApplytool;
	}
	
	public String chatWithAgent(String query, Integer userId) {
		OpenAiChatOptions options = OpenAiChatOptions.builder()
                .model("openai/gpt-oss-20b")
                .extraBody(Map.of("include_reasoning", false))
                .build();

        return chatClient
               .prompt()
//               .options(options)
               .options(options.mutate())
               .tools(internApplytool)
               .user(query+" userId-"+userId)
               .call()
               .content();
	}
}
