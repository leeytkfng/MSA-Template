package com.example.ticket.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.core.Queue; // ✅ 여기!
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange reservationExchange() {
        return new TopicExchange("reservation.exchange");
    }

    @Bean
    public Queue reservationQueue() {
        return new Queue("reservation.complete.queue");
    }

    @Bean
    public Binding reservationBinding(Queue reservationQueue, TopicExchange reservationExchange) {
        return BindingBuilder.bind(reservationQueue).to(reservationExchange).with("reservation.complete.key");
    }

    // ✅ JSON으로 메시지 직렬화 설정 추가
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // ✅ RabbitTemplate에 위 컨버터 주입
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter jsonMessageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter);
        return template;
    }
}
