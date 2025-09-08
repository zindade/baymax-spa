package com.codeforall.online.baymax.converters;

import org.springframework.core.convert.converter.Converter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * An abstract base class for converting objects of type {@code S} to type {@code T}.
 * @param <S> The source type to be converted.
 * @param <T> The target type after conversion.
 */
public abstract class AbstractConverter<S, T> implements Converter<S, T> {

    /**
     * @see Converter#convert(Object)
     */
    public List<T> convert(List<S> listToConvert) {

        return listToConvert.stream()
                .map(this::convert)
                .collect(Collectors.toList());
    }
}
