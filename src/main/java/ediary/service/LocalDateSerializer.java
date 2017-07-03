package ediary.service;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.time.LocalDate;

public class LocalDateSerializer extends StdSerializer<LocalDate> {

	private static final long serialVersionUID = 1L;

	public LocalDateSerializer() {
		super(LocalDate.class);
	}

	@Override
	public void serialize(LocalDate value, JsonGenerator gen, SerializerProvider sp)
			throws IOException, JsonProcessingException {
		gen.writeStartObject();
		gen.writeNumberField("year", value.getYear());
		gen.writeNumberField("monthValue", value.getMonthValue());
		gen.writeNumberField("dayOfMonth", value.getDayOfMonth());
		gen.writeEndObject();
	}
}
