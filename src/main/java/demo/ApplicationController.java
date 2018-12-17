package demo;

import models.Subscriber;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import utils.PropertiesManager;
import utils.UrlUtils;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ApplicationController {
    private PropertiesManager propertiesManager = new PropertiesManager();

    @GetMapping("connect")
    public String getParams(Model model) {
        model.addAttribute("request", new Subscriber());
        return "connect";
    }

    @PostMapping("connect")
    public ModelAndView redirect(HttpServletRequest request, @ModelAttribute Subscriber subscriber) {
        String url = UrlUtils.getUrl(propertiesManager.getUrl(), subscriber);
        return new ModelAndView("redirect:" + url);
    }
}
