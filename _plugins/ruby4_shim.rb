warn "[ruby4_shim] loading, ruby=#{RUBY_VERSION}"

[String, Array, Hash, Object].each do |klass|
  unless klass.method_defined?(:tainted?)
    klass.class_eval do
      def tainted?
        false
      end
      def untaint
        self
      end
    end
    warn "[ruby4_shim] patched #{klass}"
  end
end
