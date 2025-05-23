# app/helpers/application_helper.rb

module ApplicationHelper
  def nav_button_link(text, path, options = {})
    classes = ['nav_button']
    classes << options[:class] if options[:class].present?

    button_content = content_tag(:div, text, title: options[:title], class: classes.join(' '))

    link_to(button_content, path)
  end
end